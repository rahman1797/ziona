import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { brand } from "@/lib/constants";

const footerLinks = [
  { href: "/products", label: "Katalog" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
  { href: "/privacy", label: "Privasi" },
  { href: "/terms", label: "Ketentuan" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="font-serif text-3xl">
            {brand.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">{brand.tagline}</p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm text-white/80">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-3 text-sm text-white/80">
          <a className="flex items-center gap-3 hover:text-white" href={`mailto:${brand.email}`}>
            <Mail size={17} /> {brand.email}
          </a>
          <a className="flex items-center gap-3 hover:text-white" href={brand.whatsapp}>
            <Phone size={17} /> {brand.phone}
          </a>
          <span className="flex items-center gap-3">
            <MapPin size={17} /> {brand.address}
          </span>
          <a className="flex items-center gap-3 hover:text-white" href={brand.instagram}>
            <ExternalLink size={17} /> Instagram
          </a>
        </div>
      </Container>
      <Container className="border-t border-white/15 py-5 text-xs text-white/60">
        Hak cipta {new Date().getFullYear()} Ziona. Seluruh hak dilindungi.
      </Container>
    </footer>
  );
}
