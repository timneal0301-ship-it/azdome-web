import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500 md:text-sm">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors duration-300 hover:text-slate-900"
          >
            <Home className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="sr-only md:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-300 md:h-3.5 md:w-3.5" />
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="transition-colors duration-300 hover:text-slate-900"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  className={last ? "font-medium text-slate-900" : ""}
                  aria-current={last ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
