// middleware.js in the root
import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('authToken');
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
