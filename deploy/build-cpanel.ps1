$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$repoPrefix = $repoRoot.TrimEnd("\") + "\"
$packageRoot = Join-Path $PSScriptRoot "cpanel-package"
$archivePath = Join-Path $PSScriptRoot "santech-f-cpanel-build.zip"

function Get-EnvValue([string]$FilePath, [string]$Key) {
  if (-not (Test-Path -LiteralPath $FilePath)) { return $null }
  $line = Get-Content -LiteralPath $FilePath | Where-Object { $_ -match "^\s*$([regex]::Escape($Key))\s*=" } | Select-Object -Last 1
  if (-not $line) { return $null }
  $value = ($line -replace "^\s*$([regex]::Escape($Key))\s*=\s*", "").Trim()
  if ($value.Length -ge 2 -and (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'")))) {
    $value = $value.Substring(1, $value.Length - 2)
  }
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  return $value
}

function Remove-ProjectPath([string]$PathToRemove) {
  if (-not (Test-Path -LiteralPath $PathToRemove)) { return }
  $resolved = (Resolve-Path -LiteralPath $PathToRemove).Path
  if (-not $resolved.StartsWith($repoPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove a path outside the project: $resolved"
  }
  Remove-Item -LiteralPath $resolved -Recurse -Force
}

foreach ($requiredPath in @("package.json", "package-lock.json", "next.config.mjs", "server.cjs", "public", ".next")) {
  if (-not (Test-Path -LiteralPath (Join-Path $repoRoot $requiredPath))) {
    throw "Required production build file or directory is missing: $requiredPath"
  }
}

$platformUrl = $env:NEXT_PUBLIC_PLATFORM_URL
if ([string]::IsNullOrWhiteSpace($platformUrl)) {
  $platformUrl = Get-EnvValue (Join-Path $repoRoot ".env.production.local") "NEXT_PUBLIC_PLATFORM_URL"
}
if ([string]::IsNullOrWhiteSpace($platformUrl)) {
  $platformUrl = Get-EnvValue (Join-Path $repoRoot ".env.local") "NEXT_PUBLIC_PLATFORM_URL"
}
if ([string]::IsNullOrWhiteSpace($platformUrl)) {
  throw "Set NEXT_PUBLIC_PLATFORM_URL in the environment, .env.production.local, or .env.local before building."
}

$platformUrl = $platformUrl.Trim().TrimEnd("/") -replace "^http://", "https://"
$parsedPlatformUrl = $null
if (-not [uri]::TryCreate($platformUrl, [System.UriKind]::Absolute, [ref]$parsedPlatformUrl) -or $parsedPlatformUrl.Scheme -ne "https") {
  throw "NEXT_PUBLIC_PLATFORM_URL must be a valid HTTPS URL for the production build."
}

Write-Host "Building santech-f for cPanel with platform API: $platformUrl"
$oldPlatformUrl = $env:NEXT_PUBLIC_PLATFORM_URL
try {
  $env:NEXT_PUBLIC_PLATFORM_URL = $platformUrl
  Push-Location $repoRoot
  try {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw "Next.js production build failed with exit code $LASTEXITCODE." }
  } finally {
    Pop-Location
  }
} finally {
  if ($null -eq $oldPlatformUrl) {
    Remove-Item Env:NEXT_PUBLIC_PLATFORM_URL -ErrorAction SilentlyContinue
  } else {
    $env:NEXT_PUBLIC_PLATFORM_URL = $oldPlatformUrl
  }
}

Remove-ProjectPath $packageRoot
New-Item -ItemType Directory -Path $packageRoot | Out-Null
$stagedNext = Join-Path $packageRoot ".next"
New-Item -ItemType Directory -Path $stagedNext | Out-Null
Copy-Item -LiteralPath (Join-Path $repoRoot ".next\server") -Destination $stagedNext -Recurse
Copy-Item -LiteralPath (Join-Path $repoRoot ".next\static") -Destination $stagedNext -Recurse
Get-ChildItem -LiteralPath (Join-Path $repoRoot ".next") -File | Copy-Item -Destination $stagedNext
Copy-Item -LiteralPath (Join-Path $repoRoot "public") -Destination $packageRoot -Recurse
Copy-Item -LiteralPath @(
  (Join-Path $repoRoot "server.cjs"),
  (Join-Path $repoRoot "next.config.mjs"),
  (Join-Path $repoRoot "package.json"),
  (Join-Path $repoRoot "package-lock.json"),
  (Join-Path $repoRoot "CPANEL.md")
) -Destination $packageRoot

Remove-ProjectPath $archivePath
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($archivePath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  Get-ChildItem -LiteralPath $packageRoot -Force -File -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($packageRoot.Length + 1).Replace("\", "/")
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $archive,
      $_.FullName,
      $relativePath,
      [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
  }
} finally {
  $archive.Dispose()
}

$checkArchive = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
try {
  $entryNames = @($checkArchive.Entries | ForEach-Object FullName)
  $requiredEntries = @(".next/BUILD_ID", "server.cjs", "next.config.mjs", "package.json", "package-lock.json")
  $missingEntries = @($requiredEntries | Where-Object { $_ -notin $entryNames })
  $chunkCount = @($entryNames | Where-Object { $_ -like ".next/static/chunks/*" }).Count
  $publicFileCount = @($entryNames | Where-Object { $_ -like "public/*" }).Count
  $environmentFileCount = @($entryNames | Where-Object { $_ -match "(^|/)\.env" }).Count
  if ($missingEntries.Count -gt 0 -or $chunkCount -eq 0 -or $publicFileCount -eq 0 -or $environmentFileCount -gt 0) {
    throw "ZIP validation failed. Missing entries: $($missingEntries -join ', '); JS chunks: $chunkCount; public files: $publicFileCount; env files: $environmentFileCount."
  }

  $archiveInfo = Get-Item -LiteralPath $archivePath
  Write-Host ""
  Write-Host "cPanel package created and verified:"
  Write-Host "  ZIP: $archivePath"
  Write-Host ("  Size: {0:N2} MB" -f ($archiveInfo.Length / 1MB))
  Write-Host "  Files: $($checkArchive.Entries.Count) ($chunkCount JS chunks, $publicFileCount public assets)"
  Write-Host "  Platform API: $platformUrl"
  Write-Host "  Environment files included: no"
  Write-Host ""
  Write-Host "Upload and extract the ZIP directly into the cPanel application root, run NPM Install, then restart the Node.js app."
} finally {
  $checkArchive.Dispose()
}
