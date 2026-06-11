"use client";

/**
 * BlogContentRenderer.jsx
 *
 * Renders stored blog HTML that may contain component placeholders:
 *   <div data-component="ComponentName"></div>
 *
 * Strategy: parse the HTML string, split on placeholder divs, then
 * interleave sanitized HTML segments with real React components.
 * NO eval(), NO dangerouslySetInnerHTML on component slots -> XSS-safe.
 *
 * Usage:
 *   import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
 *   <BlogContentRenderer html={blog.content} />
 *
 * To add a new injectable component:
 *   1. Add it to COMPONENT_MAP below
 */

import React from "react";

// ─── Component whitelist map ──────────────────────────────────────────────────
// Only components listed here will ever be rendered. Unknown data-component
// values are silently dropped — no eval, no dynamic require.
const COMPONENT_MAP = {};

// ─── Regex to find component placeholders in the stored HTML string ───────────
const COMPONENT_RE =
  /<div[^>]+data-component="([A-Za-z][A-Za-z0-9]*)"[^>]*(?:\/>|>[\s\S]*?<\/div>)/gi;

/**
 * Split `html` into an array of alternating text/component tokens.
 * Returns: Array<{ type: "html" | "component", value: string }>
 */
function tokenize(html) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  const re = new RegExp(COMPONENT_RE.source, "gi");

  while ((match = re.exec(html)) !== null) {
    const [fullMatch, name] = match;
    const start = match.index;

    if (start > lastIndex) {
      tokens.push({ type: "html", value: html.slice(lastIndex, start) });
    }

    tokens.push({ type: "component", value: name });
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < html.length) {
    tokens.push({ type: "html", value: html.slice(lastIndex) });
  }

  return tokens;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BlogContentRenderer({ html = "", className = "" }) {
  if (!html) return null;

  const tokens = tokenize(html);
  return (
    <div className={`blog-content ${className}`}>
      {tokens.map((token, i) => {
        if (token.type === "html") {
          return (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: token.value }}
            />
          );
        }

        const name = token.value;
        const Component = COMPONENT_MAP[name];
        if (!Component) {
          console.warn(`[BlogContentRenderer] Unknown component: "${name}". Add it to COMPONENT_MAP.`);
          return null;
        }

        return <Component key={i} />;
      })}
    </div>
  );
}
