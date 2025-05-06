import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUsuarioDto } from "./dto/create-user.dto";
import { hashPassword } from "../common/utils/bcrypt.util";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUsuarioDto) {
        return await this.prisma.$transaction(async (prisma) => {
            try {
                const hashedPassword = await hashPassword(data.senha);
                const usuario = await prisma.usuarios.create({
                    data: {
                        ...data,
                        senha: hashedPassword,
                    },
                });
                return { message: "Usuario criado com sucesso!", usuario };
            } catch (error) {
                throw new Error("Erro ao criar usuario!");
            }
        });
    }
    
    
    async findByEmail(email: string) {
        try {
            return await this.prisma.usuarios.findUnique({
                where: { email },
            });
        } catch (error) {
            return { message: "Erro ao buscar usuario pelo email!" };
        }
    }

    async delete(id: string) {
        return await this.prisma.$transaction(async (prisma) => {
            try {
                await prisma.usuarios.delete({
                    where: { id },
                });
                return { message: "Usuario deletado com sucesso!" };
            } catch (error) {
                return { message: "Erro ao deletar usuario!" };
            }
        });
    }
}