import { AuthService } from '../service/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';

export interface JwtPayload {
    email: string;
    sub: number;
}

export class AtStrategy extends PassportStrategy(Strategy, 'at') {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'at-secret',
        });
    }

    async validate(payload: JwtPayload) {
        return await this.authService.validateUser(payload);
    }
}
