"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { brand } from "@/lib/constants";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Katalog" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-2xl text-primary" aria-label="Beranda Ziona">
          <img className="h-10" src="https://lh3.googleusercontent.com/d/169u2J3RFy02_s2MbXKiSqZ5_U51pnC6H" alt={brand.name} />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LinkButton href="/products?q=" variant="ghost" aria-label="Cari katalog">
            <Search size={18} />
          </LinkButton>
          <LinkButton href="/products" variant="outline">
            <ShoppingBag size={17} />
            Belanja
          </LinkButton>
        </div>
        <Button
          variant="ghost"
          className="h-11 w-11 px-0 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Buka atau tutup menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </Container>
      <div
        className={cn(
          "grid border-t border-border/70 bg-background transition-[grid-template-rows] md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="overflow-hidden">
          <Container className="grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 text-sm font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      </div>
    </header>
  );
}
