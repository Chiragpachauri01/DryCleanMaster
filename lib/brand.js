/**
 * lib/brand.js
 *
 * Single source of truth for this site's brand identity (canonical domain,
 * name, logo, accent). Web Stories code reads everything through `brand` so the
 * same pipeline works per-brand without hardcoded domains.
 */

const stripTrailingSlash = (u) => (u || "").replace(/\/+$/, "");

export const brand = {
  // Must match the `brand` field written by the BlogSpot admin.
  id: "dryclean-master",

  name: "Dryclean Master",
  shortName: "Dryclean Master",

  // Authoritative production domain — used by layout structured data, the
  // LocalBusiness @id, and the existing sitemap (www.drycleanmasters.com).
  // (The old blog/web-stories code used drycleanmaster.in, which is the outlier.)
  siteUrl: stripTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.drycleanmasters.com"
  ),

  logoPath: "/logo.png",

  // Accent for the AMP story (CTA buttons) and related UI. sky-600.
  accent: "#0284c7",
};

/** Absolute URL helper — `url("/web-stories/")` → "https://…/web-stories/". */
export const url = (path = "/") =>
  `${brand.siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;

/** Absolute logo URL, always in sync with the active siteUrl. */
export const logoUrl = url(brand.logoPath);

export default brand;
