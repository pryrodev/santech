"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Maximize2,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

export type LibraryBook = {
  id: string;
  title: string;
  coverTitle: string;
  coverSubtitle: string;
  coverImage?: string;
  description: string;
  category: string;
  pages: string;
  accent: string;
  coverInk: string;
  readerUrl?: string | null;
};

type SanHubDigitalLibraryProps = {
  /** Replace this with the published SAN BOOK reader URL when it is available. */
  src?: string;
  books?: readonly LibraryBook[];
};

const defaultLibrarySource = "/innovation-lab/product/san-book";

const fallbackLibraryBooks: LibraryBook[] = [
  {
    id: "san-book",
    title: "SAN BOOK",
    coverTitle: "SAN BOOK",
    coverSubtitle: "Useful technology\nstronger systems",
    coverImage: undefined,
    description:
      "Digital learning, academic resources, and practical guides from the SAN ecosystem.",
    category: "Learning systems",
    pages: "01",
    accent: "#0a1f44",
    coverInk: "#e8fbff",
  },
  {
    id: "ai-playbook",
    title: "AI PLAYBOOK",
    coverTitle: "AI\nPLAYBOOK",
    coverSubtitle: "Build with intelligence",
    coverImage: undefined,
    description:
      "A practical introduction to building useful AI products and workflows.",
    category: "Artificial intelligence",
    pages: "02",
    accent: "#087ea4",
    coverInk: "#f2ffff",
  },
  {
    id: "field-notes",
    title: "FIELD NOTES",
    coverTitle: "FIELD\nNOTES",
    coverSubtitle: "Impact and innovation",
    coverImage: undefined,
    description:
      "Stories, methods, and lessons from projects making technology more useful.",
    category: "Impact and innovation",
    pages: "03",
    accent: "#355c4c",
    coverInk: "#fff7d7",
  },
  {
    id: "digital-africa",
    title: "DIGITAL AFRICA",
    coverTitle: "DIGITAL\nAFRICA",
    coverSubtitle: "People, systems, possibility",
    coverImage: undefined,
    description:
      "Perspectives on connected communities, digital skills, and the future of work.",
    category: "Community and access",
    pages: "04",
    accent: "#a65d35",
    coverInk: "#fff2d2",
  },
];

export function SanHubDigitalLibrary({
  src = defaultLibrarySource,
  books,
}: SanHubDigitalLibraryProps) {
  const [activeBook, setActiveBook] = useState<LibraryBook | null>(null);
  const visibleLibraryBooks =
    books && books.length > 0 ? books : fallbackLibraryBooks;

  return (
    <section
      id="san-hub-digital-library"
      className="san-hub-graphic-section scroll-mt-40 border-b border-[#0a1f44]/10 px-4 py-7 sm:px-6 lg:px-8 lg:py-9"
    >
      <div className="mx-auto max-w-7xl rounde-md bg-white px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {activeBook ? (
          <BookReader
            book={activeBook}
            src={src}
            onBack={() => setActiveBook(null)}
          />
        ) : (
          <BookShelf books={visibleLibraryBooks} onOpen={setActiveBook} />
        )}
      </div>
    </section>
  );
}

function BookShelf({
  books,
  onOpen,
}: {
  books: readonly LibraryBook[];
  onOpen: (book: LibraryBook) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("All books");
  const [query, setQuery] = useState("");
  const categories = useMemo(
    () => ["All books", ...new Set(books.map((book) => book.category))],
    [books],
  );
  const visibleBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      return books.filter((book) =>
        `${book.title} ${book.category} ${book.description}`
          .toLowerCase()
          .includes(normalizedQuery),
      );
    }

    return activeCategory === "All books"
      ? books
      : books.filter((book) => book.category === activeCategory);
  }, [activeCategory, books, query]);

  return (
    <>
      <div className="space-y-5 px-2 py-5 sm:px-4 lg:px-6 lg:py-7">
        <div className="relative max-w-2xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#0a1f44]/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search books across all categories"
            aria-label="Search books across all categories"
            className="w-full rounded-lg border border-[#0a1f44]/20 bg-[#f8fbfd] py-3 pl-10 pr-10 text-sm text-[#0a1f44] outline-none transition-colors placeholder:text-slate-500 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear book search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0a1f44]/55 transition-colors hover:text-[#0a1f44]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          className="-mx-2 overflow-x-auto border-b border-[#0a1f44]/15 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Book categories"
        >
          <div className="flex min-w-max gap-6">
            {categories.map((category) => {
              const active = activeCategory === category && !query;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveCategory(category);
                    setQuery("");
                  }}
                  className={`border-b-2 px-1 pb-3 text-xs font-bold transition-colors ${active ? "border-[#0a1f44] text-[#0a1f44]" : "border-transparent text-slate-500 hover:border-[#0a1f44]/30 hover:text-[#0a1f44]"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {visibleBooks.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
            aria-label="SAN HUB book collection"
          >
            {visibleBooks.map((book) => (
              <div key={book.id} className="min-w-0 snap-start">
                <BookCover book={book} onOpen={onOpen} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#0a1f44]/20 bg-[#f8fbfd] px-5 py-10 text-center">
            <p className="text-sm font-bold text-[#0a1f44]">No books found.</p>
            <p className="mt-1 text-xs text-slate-600">
              Try another title, category, or search term.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function BookCover({
  book,
  onOpen,
}: {
  book: LibraryBook;
  onOpen: (book: LibraryBook) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(book)}
      className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-4"
    >
      <span className="relative mx-auto block w-[min(100%,180px)] [perspective:1000px] sm:mx-0">
        <span
          className="relative block aspect-[0.7] overflow-hidden border border-black/20 shadow-[10px_14px_16px_rgba(10,31,68,0.2)] transition duration-300 ease-out group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]"
          style={{
            backgroundColor: book.accent,
            backgroundImage: book.coverImage
              ? `linear-gradient(rgba(7, 21, 45, 0.08), rgba(7, 21, 45, 0.08)), url(${book.coverImage})`
              : `linear-gradient(135deg, ${book.accent}, ${book.accent}cc 58%, #07152d)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span
            className="absolute inset-y-0 left-0 w-3 border-r border-black/20 bg-black/15 shadow-[inset_-3px_0_4px_rgba(255,255,255,0.12)]"
            aria-hidden="true"
          />
          {!book.coverImage && (
            <>
              <span
                className="absolute inset-x-5 top-5 text-center text-[8px] font-black uppercase tracking-[0.22em]"
                style={{ color: book.coverInk }}
              >
                SAN HUB / {book.pages}
              </span>
              <span
                className="absolute inset-x-6 top-[38%] whitespace-pre-line text-center text-xl font-black uppercase leading-[0.95] tracking-[-0.04em]"
                style={{ color: book.coverInk }}
              >
                {book.coverTitle}
              </span>
              <span
                className="absolute inset-x-8 bottom-12 whitespace-pre-line text-center text-[9px] font-medium uppercase leading-4 tracking-[0.12em]"
                style={{ color: book.coverInk }}
              >
                {book.coverSubtitle}
              </span>
            </>
          )}
        </span>
      </span>
      <span className="mt-4 block text-base font-bold leading-tight tracking-[-0.03em] text-[#0a1f44]">
        {book.title}
      </span>
      <span className="mt-1 block text-xs leading-5 text-slate-600">
        {book.description}
      </span>
      <span className="mt-2 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#0a1f44] transition-colors group-hover:text-brand-cyan">
        Open book
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}

function BookReader({
  book,
  src,
  onBack,
}: {
  book: LibraryBook;
  src: string;
  onBack: () => void;
}) {
  const readerSource = book.readerUrl || src;
  return (
    <>
      <div className="mb-5 grid gap-3 border-b border-[#0a1f44]/15 pb-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 justify-self-start text-xs font-bold text-[#0a1f44] hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to library
        </button>
        <h1 className="font-exo text-center text-2xl font-bold leading-tight tracking-[-0.05em] text-[#0a1f44] sm:text-3xl lg:text-4xl">
          {book.title}
        </h1>
        <a
          href={readerSource}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 justify-self-start text-xs font-bold text-[#0a1f44] underline-offset-4 hover:text-brand-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 sm:justify-self-end"
        >
          Open in new tab
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <div className="grid overflow-hidden border border-[#0a1f44]/20 bg-[#0a1f44] shadow-[0_18px_45px_rgba(10,31,68,0.16)] lg:grid-cols-[minmax(220px,0.28fr)_minmax(0,1fr)]">
        <aside className="relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-[#0a1f44] p-7 text-white sm:p-9 lg:min-h-[580px] lg:p-10">
          <div
            className="absolute inset-y-0 right-0 w-px bg-white/20"
            aria-hidden="true"
          />
          <div>
            <div className="mb-12 flex items-center justify-between text-white/70">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]">
                SAN HUB
              </span>
              <Bookmark className="size-5 text-brand-cyan" aria-hidden="true" />
            </div>
            <p className="max-w-[12ch] text-2xl font-bold leading-tight tracking-[-0.04em] sm:text-3xl">
              {book.title}
            </p>
          </div>
          <div className="mt-10">
            <div className="mb-4 h-px w-12 bg-brand-cyan" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Volume {book.pages}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              {book.description}
            </p>
          </div>
        </aside>

        <div className="min-w-0 bg-[#fdfcf8] p-3 sm:p-5 lg:p-7">
          <div className="flex items-center justify-between border-b border-[#0a1f44]/15 px-2 pb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#0a1f44]/60 sm:px-4">
            <span>Reading room</span>
            <span className="inline-flex items-center gap-2">
              <Maximize2 className="size-3.5" aria-hidden="true" /> SAN BOOK
            </span>
          </div>
          <div className="mt-3 overflow-hidden border border-[#0a1f44]/15 bg-white shadow-[0_8px_24px_rgba(10,31,68,0.08)]">
            <iframe
              title={`${book.title} digital book`}
              src={readerSource}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-[500px] w-full border-0 sm:h-[560px] lg:h-[640px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
