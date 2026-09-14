import { NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) return NextResponse.json({ message: "API_BASE_URL não configurado." }, { status: 503 });

  const { path } = await params;
  const target = new URL(path.join("/"), apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`);
  target.search = request.nextUrl.search;
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  try {
    const response = await fetch(target, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    });
    return new NextResponse(response.body, { status: response.status, headers: response.headers });
  } catch {
    return NextResponse.json({ message: "A Web API não está disponível." }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
