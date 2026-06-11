import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-5xl place-items-center px-6 py-40 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium tracking-tight">
          This page didn&apos;t <em className="text-accent">ship</em>.
        </h1>
        <p className="mt-4 text-muted">
          Either it moved, or it never made the cut. Every good product has one.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Back to the work
        </Link>
      </div>
    </div>
  );
}
