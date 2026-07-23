"use client";

import { Download } from "lucide-react";

export function CatalogDownloadButton() {
  return (
    <a
      className="fixed bottom-5 right-5 z-30 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#B8925A] px-5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(34,34,34,0.22)] transition hover:bg-[#A07E4E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8925A]"
      href="/catalog/pdf"
      download="katalog-ziona.pdf"
    >
      <Download size={18} />
      Download Katalog
    </a>
  );
}
