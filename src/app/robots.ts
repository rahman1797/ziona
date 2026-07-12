import type { MetadataRoute } from "next";
import { brand } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: `${brand.url}/sitemap.xml`,
    host: brand.url,
  };
}
