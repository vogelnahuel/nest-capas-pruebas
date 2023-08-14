import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async validate(payload: any): Promise<any> {
        const { username } = payload;
        if (username !== 'testing2@gmail.com') {
            throw new UnauthorizedException('token is invalid');
        }
        return { id: payload.id, username: username, iat: payload.iat, exp: payload.exp };
    }
}
