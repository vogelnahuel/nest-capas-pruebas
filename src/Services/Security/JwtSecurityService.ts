/* eslint-disable no-empty-function */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class JwtSecurityService {
    constructor(private readonly _jwtService: JwtService) {}

    decode(token: string) {
        const tokenDecoded: any = this._jwtService.decode(token, { json: true });
        return {
            id: tokenDecoded.id,
            username: tokenDecoded.username,
            iat: tokenDecoded.iat,
            exp: tokenDecoded.exp,
        };
    }

    async generateAccessToken(uuid: string, id: number, username: string, permissions: string[]): Promise<string> {
        try {
            const payload = { uuid, id, username, permissions };
            const tokenExpiration = '8h';
            return this._jwtService.sign(payload, {
                expiresIn: tokenExpiration,
                privateKey: process.env.JWT_SECRET_KEY,
            });
        } catch (error) {
            console.error('JWT creation error');
            return null;
        }
    }
}
