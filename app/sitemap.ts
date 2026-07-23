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
    { url: "https://ventriq.io/founders-after-hours", lastModified: new Date("2026-07-23"), priority: 0.7 },
    { url: "https://ventriq.io/mastermind", lastModified: new Date("2026-07-23"), priority: 0.7 },
    { url: "https://ventriq.io/about", lastModified: new Date("2026-07-23"), priority: 0.6 },
    { url: "https://ventriq.io/contact", lastModified: new Date("2026-07-23"), priority: 0.4 },
  ];
}
