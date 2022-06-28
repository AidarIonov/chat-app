import {
    Controller,
    Get,
    Patch,
    HttpCode,
    NotFoundException,
    Param,
    Query,
    UsePipes,
    ValidationPipe, Body
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.decorator";
import {Auth} from "../auth/auth.decorator";
import {UpdateProfileDto} from "./dto/updateProfile.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @Auth()
    async getAll(@Query('search') search?: string) {
        const doc = await this.userService.getAllUsers(search)
        if (!doc.length) throw new NotFoundException('Users not found')
        return doc
    }

    @Get('profile')
    @Auth()
    async getCurrentUser(@User('id') id: number) {
        const doc = await this.userService.getCurrent(id)
        if (!doc) throw new NotFoundException('User not found')
        return doc
    }

    @UsePipes(new ValidationPipe())
    @Patch('profile')
    @Auth()
    async updateProfile(@User('id') id: number, @Body() dto: UpdateProfileDto) {
        const doc = await this.userService.update(id, dto)
    }

    @Get(':id')
    @Auth()
    async getById(@Param('id') id: string) {
        const doc = await this.userService.byId(+id)
        if (!doc) throw new NotFoundException('User not found')
        return doc
    }

}
