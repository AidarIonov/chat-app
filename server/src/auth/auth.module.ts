import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJWTConfig} from "../config/jwt.config";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {HttpModule} from "@nestjs/axios";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig
        }),
        HttpModule,
        PrismaModule
    ],
    exports: [AuthService]
})
export class AuthModule {
}
