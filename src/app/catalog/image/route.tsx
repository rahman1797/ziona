import { ImageResponse } from "next/og";
import { getCatalogItems } from "@/components/catalog/catalog-shared";
import { brand } from "@/lib/constants";
import { getProducts } from "@/services/catalog";

export const runtime = "nodejs";
export const revalidate = 300;

const width = 1080;
const cardWidth = 305;
const cardGap = 18;
const cardHeight = 470;
const horizontalPadding = 44;

export async function GET() {
  const result = await getProducts();
  const products = result.ok ? result.products : [];
  const items = getCatalogItems(products);
  const rows = Math.ceil(items.length / 3);
  const productsHeight = rows * cardHeight + Math.max(rows - 1, 0) * cardGap;
  const sheetHeight = 195 + 165 + productsHeight + 135 + 115 + 54;

  const image = new ImageResponse(
    <div
      style={{
        width,
        minHeight: sheetHeight,
        display: "flex",
        flexDirection: "column",
        background: "#F8F7F3",
        color: "#222222",
        fontFamily: "sans-serif",
      }}
    >
      <Header />
      <Intro />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: cardGap,
          padding: `0 ${horizontalPadding}px`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              position: "relative",
              width: cardWidth,
              height: cardHeight,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #DDD7CA",
              borderRadius: 12,
              background: "rgba(255,255,255,0.72)",
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 34,
                marginBottom: 8,
                borderRadius: 6,
                background: "#5D5E4D",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {item.number}
            </div>
            <div
              style={{
                height: 183,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : null}
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 23,
                  fontWeight: 900,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  borderTop: "1px solid #DDD7CA",
                  marginTop: 12,
                  paddingTop: 12,
                  fontSize: 16,
                }}
              >
                {item.basePrice > item.price ? (
                  <div
                    style={{
                      display: "flex",
                      color: "rgba(34,34,34,0.65)",
                      textDecoration: "line-through",
                      fontWeight: 600,
                    }}
                  >
                    {formatImagePrice(item.basePrice)}
                  </div>
                ) : null}
                <div style={{ display: "flex", fontWeight: 900 }}>
                  {formatImagePrice(item.price)}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 12,
                  minHeight: 75,
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: "rgba(34,34,34,0.78)",
                }}
              >
                {item.description}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "rgba(34,34,34,0.75)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 17,
                    height: 17,
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.1)",
                    background: item.colorHex,
                  }}
                />
                {item.colorLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      <InfoPanel />
      <Footer />
    </div>,
    {
      width,
      height: sheetHeight,
    },
  );

  try {
    const png = await image.arrayBuffer();

    return new Response(png, {
      headers: {
        "Cache-Control":
          "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
        "Content-Disposition": 'attachment; filename="katalog-ziona.png"',
        "Content-Length": String(png.byteLength),
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Failed to generate catalog download.", error);

    return Response.json(
      {
        error:
          "Gagal membuat file katalog. Coba refresh halaman, lalu download kembali.",
      },
      { status: 503 },
    );
  }
}

function Header() {
  return (
    <div
      style={{
        height: 195,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#5D5E4D",
        color: "#F1EFEA",
        padding: "34px 72px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 76,
            lineHeight: 0.95,
          }}
        >
          {brand.name}
        </div>
        <div style={{ display: "flex", marginTop: 6, fontSize: 25 }}>
          style meets comfort
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "serif",
            fontSize: 52,
            lineHeight: 1,
          }}
        >
          Catalog
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 25,
            fontWeight: 600,
          }}
        >
          #BanggaProdukIndonesia
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div
      style={{
        height: 165,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 25,
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "serif",
          fontSize: 36,
          fontWeight: 800,
        }}
      >
        Step into elegance, every day.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 14,
          width: 640,
          fontSize: 18,
          lineHeight: 1.55,
          color: "rgba(34,34,34,0.8)",
        }}
      >
        Koleksi sepatu wanita Ziona dirancang untuk menemani setiap langkah Anda
        dengan perpaduan sempurna antara gaya dan kenyamanan.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 360,
            height: 2,
            background: "#5D5E4D",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 34,
            height: 34,
          }}
        >
          {[0, 1, 2, 3].map((petal) => (
            <div
              key={petal}
              style={{
                position: "absolute",
                left: petal % 2 === 0 ? 12 : petal === 1 ? 20 : 4,
                top: petal % 2 === 0 ? (petal === 0 ? 4 : 20) : 12,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#5D5E4D",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 14,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#5D5E4D",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: 360,
            height: 2,
            background: "#5D5E4D",
          }}
        />
      </div>
    </div>
  );
}

function InfoPanel() {
  return (
    <div
      style={{
        height: 135,
        margin: "20px 76px 0",
        display: "flex",
        border: "1px solid #DDD7CA",
        borderRadius: 12,
        background: "rgba(255,255,255,0.55)",
        padding: 24,
      }}
    >
      <div style={{ display: "flex", width: "50%", gap: 18 }}>
        <Icon type="ruler" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 21, fontWeight: 900 }}>
            TERSEDIA UKURAN
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 5,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            36 - 41
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 4,
              fontSize: 13,
              lineHeight: 1.4,
              color: "rgba(34,34,34,0.75)",
            }}
          >
            (Mohon konfirmasi terlebih dahulu ketersediaan stok)
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "50%",
          gap: 18,
          borderLeft: "1px solid #DDD7CA",
          paddingLeft: 32,
        }}
      >
        <Icon type="gift" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 21, fontWeight: 900 }}>
            CATATAN
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 11,
              fontSize: 14,
              lineHeight: 1.55,
              color: "rgba(34,34,34,0.82)",
            }}
          >
            Harga belum termasuk biaya ongkir.
            <br />
            Harga spesial untuk pembelian partai, hubungi WA untuk info
            selanjutnya.
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        height: 115,
        margin: "18px 52px 0",
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #DDD7CA",
        color: "rgba(34,34,34,0.78)",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.45,
      }}
    >
      <FooterItem icon="whatsapp">
        Whatsapp :
        <br />
        {brand.phone.replace(/\s/g, "")}
        <br />
        (Whatsapp Text Only)
      </FooterItem>
      <FooterItem icon="camera">
        @ziona.collection
        <br />
        #StyleMeetsComfort
        <br />
        #BanggaProdukIndonesia
      </FooterItem>
      <FooterItem icon="bag">
        Terima kasih telah memilih
        <br />
        Ziona sebagai bagian dari
        <br />
        gaya hidup Anda.
      </FooterItem>
    </div>
  );
}

function FooterItem({
  icon,
  children,
}: {
  icon: IconType;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "33.333%",
        height: 72,
        display: "flex",
        alignItems: "center",
        gap: 18,
        paddingLeft: 24,
        borderLeft: icon === "whatsapp" ? "0" : "1px solid #DDD7CA",
      }}
    >
      <Icon type={icon} small />
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

type IconType = "ruler" | "gift" | "whatsapp" | "camera" | "bag";

function Icon({ type, small = false }: { type: IconType; small?: boolean }) {
  const size = small ? 58 : 66;

  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        background: "#5D5E4D",
        color: "#F1EFEA",
      }}
    >
      <IconShape type={type} size={small ? 33 : 37} />
    </div>
  );
}

function IconShape({ type, size }: { type: IconType; size: number }) {
  const common = {
    fill: "none",
    stroke: "#F1EFEA",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 3.2,
  };

  if (type === "ruler") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <rect
          {...common}
          x="8"
          y="12"
          width="24"
          height="16"
          rx="3"
          transform="rotate(45 20 20)"
        />
        <path {...common} d="M14 14l4 4" />
        <path {...common} d="M18 10l3 3" />
        <path {...common} d="M22 22l4 4" />
        <path {...common} d="M26 18l3 3" />
      </svg>
    );
  }

  if (type === "gift") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <rect {...common} x="9" y="18" width="22" height="15" rx="2" />
        <path {...common} d="M20 18v15" />
        <path {...common} d="M7 14h26v6H7z" />
        <path {...common} d="M20 14c-4-7-11-4-8 1 2 3 8-1 8-1z" />
        <path {...common} d="M20 14c4-7 11-4 8 1-2 3-8-1-8-1z" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path
          {...common}
          d="M20 7c7 0 13 5.5 13 12.5S27 32 20 32c-2.2 0-4.2-.5-6-1.4L8 32l1.6-5.6C8 24.5 7 22.1 7 19.5 7 12.5 13 7 20 7z"
        />
      </svg>
    );
  }

  if (type === "camera") {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <rect {...common} x="8" y="13" width="24" height="20" rx="4" />
        <path {...common} d="M15 13l2.5-5h5L25 13" />
        <circle {...common} cx="20" cy="23" r="5" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path {...common} d="M12 14h16l2 20H10l2-20z" />
      <path {...common} d="M15 14c0-4 2-7 5-7s5 3 5 7" />
      <path {...common} d="M15 22c1 3 3 5 5 5s4-2 5-5" />
    </svg>
  );
}

function formatImagePrice(value: number) {
  return `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
}
