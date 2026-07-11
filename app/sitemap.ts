import type { MetadataRoute } from "next";
import { getPublishedStories } from "@/lib/webstories";

const siteUrl = "https://www.drycleanmasters.com";
const lastModified = new Date("2026-06-10");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/home-deep-cleaning-services-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sofa-dry-cleaning-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/carpet-cleaning-services-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/office-chair-cleaning-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/mattress-cleaning-services-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/office-cleaning-services-delhi/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/web-stories/`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // ── Dynamic web story routes ─────────────────────────────────────────
  let storyRoutes: MetadataRoute.Sitemap = [];
  try {
    const stories = await getPublishedStories();
    storyRoutes = stories.map((s: any) => ({
      url: `${siteUrl}/web-stories/${s.slug}/`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : (s.publishedAt ? new Date(s.publishedAt) : lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("[sitemap] web stories fetch failed:", err);
  }

  return [...staticRoutes, ...storyRoutes];
}
