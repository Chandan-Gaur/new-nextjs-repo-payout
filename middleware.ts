export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/admin/:path*", "/merchants/:path*", "/viewtransactions/:path*"],
};
