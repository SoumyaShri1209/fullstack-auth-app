import { NextResponse } from 'next/server'

 

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path= request.nextUrl.pathname
  const isPublicPath = path==="/login" || path==="/signup" || path==="/verifyemail" || path==="/forgotPassword" || path==="/resetPassword";
  const token = request.cookies.get('token')?.value||""

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }


}


 
// See "Matching Paths" below 
export const config = {
  matcher: [
    "/",
    '/profile',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail',
    '/resetPassword',
    '/forgotPassword'
  ]
}