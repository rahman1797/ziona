import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-secondary py-20">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="poppins mt-4 text-5xl text-foreground md:text-7xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Halaman yang kamu buka tidak tersedia atau mungkin sudah dipindahkan.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton href="/">Kembali ke beranda</LinkButton>
        </div>
      </Container>
    </section>
  );
}
