import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ventriq.io",
      lastModified: new Date("2026-07-23"),
      priority: 1,
    },
    {
      url: "https://ventriq.io/summit",
      lastModified: new Date("2026-07-23"),
      priority: 0.9,
    },
  ];
}
