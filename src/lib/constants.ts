export const brand = {
  name: "Ziona",
  tagline: "STYLE MEETS COMFORT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zionacollection-baf18.web.app",
  instagram: "https://www.instagram.com/ziona.collection/",
  whatsapp: "https://api.whatsapp.com/send?phone=6281280100253&text=Halo%2C%20boleh%20liat%20katalog%20Ziona%3F",
  email: "zionacollection.id@gmail.com",
  phone: "+62 812 8010 0253",
  address: "Jakarta, Indonesia",
};

export const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnIHZpZXdCb3g9JzAgMCAxNiAxNicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nMTYnIGZpbGw9JyNGMUVGRUEnLz48L3N2Zz4=";
