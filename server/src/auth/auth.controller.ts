import {
	Body,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('login/google')
	async googleAuth(@Body('code') code: string) {
		return this.authService.googleLogin(code);
	}
}
