import {AuthService} from "../auth.service";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
                private readonly configService: ConfigService,
                private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({email}: JwtPayload) {
        const user = await this.prismaService.user.findFirst({
            where: {email}
        });
        if (!user) {
            throw new UnauthorizedException('Invalid Token')
        }
        return user;
    }
}

export interface JwtPayload {
    email: string
}