import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
function middleware(request) {
  const token = request.cookies.get("token");
  const role = request.cookies.get('role')


  if (!token || !role || role?.value != 'admin') {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};

export default middleware;