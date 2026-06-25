// app/api/revalidate/route.js
import { revalidatePath } from "next/cache";
import { NextResponse }   from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req) {
  try {
    const { slug, secret, type } = await req.json();

    // Protect the endpoint from abuse
    if (SECRET && secret !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Base path differs by content type: blogs (default) vs web stories
    const base = type === "webstory" ? "/web-stories" : "/blog";

    // Always revalidate the listing page
    revalidatePath(base);
    revalidatePath(base, "page");

    // Revalidate the specific slug page if provided
    if (slug) {
      revalidatePath(`${base}/${slug}`);
      revalidatePath(`${base}/${slug}`, "page");
    }

    return NextResponse.json({ revalidated: true, type: type || "blog", slug: slug || "all" });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
