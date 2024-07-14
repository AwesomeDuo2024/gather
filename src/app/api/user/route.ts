import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const href = req.nextUrl.href;
  console.log("href", href);
  return Response.json({ message: "user successful" });
}
