// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const posts = [
    {
      id: 1,
      title: "Learn Next.js",
      description: "An awesome tutorial for Next.js",
    },
    {
      id: 2,
      title: "Learn React",
      description: "An awesome tutorial for React",
    },
    {
      id: 3,
      title: "Learn TypeScript",
      description: "An awesome tutorial for TypeScript",
    },
  ];
  return NextResponse.json(posts);
}
