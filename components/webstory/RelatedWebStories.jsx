/**
 * components/webstory/RelatedWebStories.jsx  (Server Component)
 *
 * Reusable, SEO-friendly "Related Web Stories" rail. Renders real <a href>
 * anchors (server-rendered HTML — crawlable, no popup/JS-only links) and shows
 * only relevant published stories via lib/webstories relevance rules.
 *
 * Renders NOTHING when there are no relevant stories — safe to drop anywhere.
 * Kept visually compact and clearly subordinate to the page's primary CTA.
 */

import Link from "next/link";
import { getRelatedStories } from "@/lib/webstories";

export default async function RelatedWebStories({
  pageType = "home",
  serviceCategory = undefined,
  location = undefined,
  tags = [],
  excludeSlug = undefined,
  max = 6,
  heading = "Web Stories",
}) {
  const stories = await getRelatedStories({
    pageType, serviceCategory, location, tags, excludeSlug, max,
  });

  if (!stories.length) return null;

  return (
    <section aria-label="Related web stories" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-600 mb-1">Web Stories</p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{heading}</h2>
          </div>
          <Link href="/web-stories/" className="text-sm font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap">
            View all →
          </Link>
        </div>

        <ul className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
          {stories.map((s) => (
            <li key={s.id} className="shrink-0 w-40 sm:w-auto">
              {/* Plain <a>: story URL is an AMP Route Handler, not an RSC page */}
              <a href={`/web-stories/${s.slug}/`}
                className="group relative block aspect-[9/16] overflow-hidden rounded-xl bg-gray-900 shadow-sm ring-1 ring-black/5 transition hover:shadow-lg">
                {s.posterImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.posterImage} alt={s.title} loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  ▶ Web Story
                </span>
                <p className="absolute bottom-0 left-0 right-0 p-2.5 text-xs font-bold leading-tight text-white drop-shadow line-clamp-3">
                  {s.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
