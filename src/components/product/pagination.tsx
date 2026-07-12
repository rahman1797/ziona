import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { updateQueryString } from "@/utils/filters";
import type { CatalogFilters } from "@/types";

export function Pagination({
  filters,
  totalPages,
}: {
  filters: Required<CatalogFilters>;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginasi">
      <Link
        href={updateQueryString(filters, { page: Math.max(1, filters.page - 1) })}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border",
          filters.page === 1 && "pointer-events-none opacity-40",
        )}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={17} />
      </Link>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <Link
            key={page}
            href={updateQueryString(filters, { page })}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
              page === filters.page
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted",
            )}
          >
            {page}
          </Link>
        );
      })}
      <Link
        href={updateQueryString(filters, { page: Math.min(totalPages, filters.page + 1) })}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border",
          filters.page === totalPages && "pointer-events-none opacity-40",
        )}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={17} />
      </Link>
    </nav>
  );
}
