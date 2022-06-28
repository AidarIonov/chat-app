import {AuthService} from "../auth.service";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {ConfigService} from "@nestjs/config";
import {UserModel} from "../../user/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
                private readonly configService: ConfigService,
                private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({id}: UserModel) {
        const user = await this.prismaService.user.findUnique({
            where: {id: Number(id)}
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