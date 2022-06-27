import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {IGoogleProfile, IResGoogleUser} from "./auth.interface";
import {JwtService} from "@nestjs/jwt";
import {firstValueFrom, map} from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }


    async validateUser(details: IResGoogleUser) {
        let user = await this.prismaService.user.findFirst({
            where: {email: details.email}
        });
        if (!user) {
            user = await this.prismaService.user.create({data: details})
        }
        return {
            user,
            accessToken: await this.issueAccessToken(String(user.id))
        };
    }

    async issueAccessToken(userId: string) {
        const data = {id: userId}

        return await this.jwtService.signAsync(data, {
            expiresIn: '31d'
        })
    }

    async getGoogleToken(code: string) {
        return firstValueFrom(
            this.httpService
                .post<{ access_token: string }>('https://oauth2.googleapis.com/token', {
                    code,
                    client_id: this.configService.get('GOOGLE_CLIENT_ID'),
                    client_secret: this.configService.get('GOOGLE_SECRET'),
                    redirect_uri: 'http://localhost:3000/google-auth',
                    grant_type: 'authorization_code'
                })
                .pipe(map((res) => res.data))
        )
    }

    async getGoogleProfile(accessToken: string) {
        return firstValueFrom(
            this.httpService
                .get<IGoogleProfile>('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .pipe(map((res) => res.data))
        )
    }

    async googleLogin(code: string) {
        if (!code) {
            throw new BadRequestException('Google code not found!')
        }
        try {
            const {access_token} = await this.getGoogleToken(code)

            const profile = await this.getGoogleProfile(access_token)

            return this.validateUser({
                email: profile.email,
                name: profile.name,
                avatarPath: profile.picture
            })
        } catch (e) {
            throw new HttpException(e.response.data, e.response.status)
        }
    }
}
