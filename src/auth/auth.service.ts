import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { comparePassword } from "../common/utils/bcrypt.util";
import { generateToken } from "../common/utils/jwt.util";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(email: string, password: string) {
        if (!email || !password) {
           return { message: "Email e senha são obrigatórios" };
        }

        const user = await this.userService.findByEmail(email);

        if (!user) {
            return { message: "Usuário não encontrado" };
        }

        if (!user.senha) {
            return { message: "É preciso digitar uma senha" };
        }

        const isPasswordValid = await comparePassword(password, user.senha);

        if (!isPasswordValid) {
            return { message: "Senha inválida" };
        }

        const token = generateToken({ id: user.id, email: user.email });

        return { token };
    }
}
