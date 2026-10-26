export default function App() {
  return (
    <main className="min-h-full flex flex-col items-start justify-center px-6 sm:px-16 max-w-4xl mx-auto">
      <svg className="drift mb-10 w-16 h-20 text-glow" viewBox="0 0 64 80" fill="none" aria-hidden="true">
        <path d="M6 34C6 18 18 6 32 6s26 12 26 28c0 3-2 4-5 4H11c-3 0-5-1-5-4Z" fill="currentColor" opacity=".85" />
        <path d="M16 40c0 10-4 14-2 26M26 40c0 12 2 18-1 32M38 40c0 12-2 18 1 32M48 40c0 10 4 14 2 26"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".6" />
      </svg>
      <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] text-white">
        Aayush Aryan
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist/80">
        This portfolio is being built. Projects, writing, and ways to get in touch are on the way.
      </p>
      <a
        href="https://github.com/AayushAryan007"
        className="mt-10 inline-block rounded-full border border-glow/40 px-6 py-3 text-glow transition-colors hover:bg-glow hover:text-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"
      >
        View my GitHub
      </a>
    </main>
  )
}
