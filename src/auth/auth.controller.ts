import { Post, Body, Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.senha);
    }
}




