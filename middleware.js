import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const authOnlyRoutes = ['/posts', '/profile'];
const noAuthOnlyRoutes = ['/login',];

export const middleware = async (req) => {
  const cookieStore = await cookies();

  const path = req.nextUrl.pathname;
  const isAuthOnlyRoute = authOnlyRoutes.includes(path);
  const isNoAuthRoute = noAuthOnlyRoutes.includes(path);

  const user = cookieStore.get('user');
  const cookie = user?.value ? JSON.parse(user.value) : {};

  // Redirect to '/login' if the user is NOT authenticated
  if (isAuthOnlyRoute && !cookie?.token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to '/' if the user is authenticated
  if (isNoAuthRoute && cookie?.token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
