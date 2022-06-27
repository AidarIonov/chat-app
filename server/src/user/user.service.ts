import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UpdateProfileDto} from "./dto/updateProfile.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAllUsers(search?: string) {
        let user

        if (search) {
            user = await this.prismaService.user.findMany({
                where: {
                    name: {
                        search
                    }
                }
            })
        } else {
            user = await this.prismaService.user.findMany()
        }
        return user
    }

    async getCurrent(id: number) {
        return this.byId(id)
    }

    async byId(id: number) {
        return this.prismaService.user.findUnique({where: {id}})
    }

    async update(id: number, dto: UpdateProfileDto) {
        const {name, avatarPath} = dto
        return this.prismaService.user.update({
            where: {
                id
            },
            data: {
                name,
                avatarPath
            },
        })
    }
}
