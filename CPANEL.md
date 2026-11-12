# Deploy santech-f to Spaceship cPanel

This runs the existing Next.js application as a cPanel Node.js app. It keeps server-rendered pages, Strapi content, dynamic routes, and the /api/pdf endpoint working; it is not a limited static export.

## Build a local upload archive

On Windows, run this from the repository root:

~~~powershell
.\deploy\build-cpanel.ps1
~~~

The script builds locally and creates `deploy/santech-f-cpanel-build.zip`. It includes the complete `.next` runtime output and `public` assets, but leaves out local environment files, `node_modules`, and build caches. Upload the ZIP and extract it directly into the cPanel application root, then use cPanel's **Run NPM Install** and restart the app. The script uses `NEXT_PUBLIC_PLATFORM_URL` from the process environment, `.env.production.local`, or `.env.local`, in that order, and requires HTTPS for the production API URL.

## 1. Prepare the server

In **cPanel -> Setup Node.js App**, create an application with:

| Setting | Value |
| --- | --- |
| Node.js version | 20.9 or newer (22.x is preferred when available) |
| Application mode | Production |
| Application root | santech-f |
| Application URL | the SAN TECH domain |
| Application startup file | server.cjs |

Do not change the domain DNS away from Vercel until the new app has built and passed the checks below.

## 2. Install only the frontend

Connect over SSH and clone this repository:

~~~bash
cd ~
git clone git@github.com:Aime-Patrick/santech.git santech-f
cd ~/santech-f
cp .env.production.example .env.production
~~~

Edit ~/santech-f/.env.production and set:

~~~env
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
STRAPI_LOG_FAILURES=true
~~~

All NEXT_PUBLIC_* values are embedded during npm run build. Rebuild after changing them.

## 3. First build

Activate the Node.js environment using the command shown by cPanel, then run:

~~~bash
cd ~/santech-f
npm ci
npm run build
mkdir -p tmp
touch tmp/restart.txt
~~~

For future deployments, run:

~~~bash
bash ~/santech-f/deploy/deploy-cpanel.sh
~~~

If the repository lives elsewhere, set SANTECH_FRONTEND_DIR when running the script.

## 4. Verify before switching DNS

Use cPanel's temporary/application URL, or a local hosts-file override, and check:

- /
- /tech-pulse
- /san-hub
- one dynamic article or course page
- one PDF opened through /api/pdf?file=...
- images loaded from Strapi/Cloudinary

Review the cPanel application log if the app does not start. The usual causes are an unsupported Node.js version, a missing .env.production, or a Strapi URL the server cannot reach.

## 5. Move the domain from Vercel

Once the checks pass, open the domain's DNS zone in Spaceship:

1. Remove the Vercel A or CNAME records for the website host only.
2. Point the root domain (@) and www to the cPanel hosting target shown by Spaceship.
3. Keep the CMS/API records unchanged.
4. Issue or enable the SSL certificate in cPanel.
5. After DNS propagation, verify the root domain and www over HTTPS.

Keep the Vercel project available until cPanel is serving correctly so DNS can be rolled back quickly if necessary.

The deployment script updates and restarts only this frontend. It does not deploy or restart the CMS.
