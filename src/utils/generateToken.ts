import { JWTPayload } from './types';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Generate JWT Token
export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(jwtPayload, privateKey, {
        expiresIn: '30d'
    });

    return token;
}

// Set Cookie with JWT
export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJWT(jwtPayload);

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // development=http, production= https
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 60s * 60m * 24h * 30d = 30 days
    });

    return cookie;
}