// app/api/revalidate/route.js
import { revalidatePath } from "next/cache";
import { NextResponse }   from "next/server";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req) {
  try {
    const { slug, secret } = await req.json();

    // Protect the endpoint from abuse
    if (SECRET && secret !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Always revalidate the listing page
    revalidatePath("/blog");
    revalidatePath("/blog", "page");

    // Revalidate the specific slug page if provided
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/blog/${slug}`, "page");
    }

    return NextResponse.json({ revalidated: true, slug: slug || "all" });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
