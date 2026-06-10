import type { MetadataRoute } from "next";

const base = "https://antoncastro.design"; // TODO(Anton): set your real domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/work/state-affairs`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/work/augmedix`, lastModified: new Date(), priority: 0.9 },
  ];
}
