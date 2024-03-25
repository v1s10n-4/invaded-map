import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (token !== process.env.REVALIDATION_TOKEN) {
    return Response.json({ message: "unauthorized" }, { status: 401 });
  }

  const paths = request.nextUrl.searchParams.get("path");
  if (paths) {
    for (const path of paths) {
      revalidatePath(path);
    }
    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: `Revalidated ${paths.length} ${paths.length > 1 ? "paths" : "path"}`,
    });
  }

  const tags = request.nextUrl.searchParams.getAll("tag");
  if (tags.length) {
    for (const tag of tags) {
      revalidateTag(tag);
    }
    return Response.json({
      revalidated: true,
      now: Date.now(),
      message: `Revalidated ${tags.length} ${tags.length > 1 ? "tags" : "tag"}`,
    });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path or tag to revalidate",
  });
}
