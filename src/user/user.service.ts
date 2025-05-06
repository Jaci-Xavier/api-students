import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../common/utils/bcrypt.util';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.$transaction(async (prisma) => {
      try {
        const hashedPassword = await hashPassword(data.password);
        const usuario = await prisma.user.create({
          data: {
            ...data,
            password: hashedPassword,
          },
        });
        return { message: 'Usuario criado com sucesso!' };
      } catch (error) {
        throw new Error('Erro ao criar usuario!');
      }
    });
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });

      
    } catch (error) {
      return { message: 'Erro ao buscar usuario pelo email!' };
    }
  }

  async delete(data: DeleteUserDto) {
    return await this.prisma.$transaction(async (prisma) => {
      try {
        const { id } = data;
        await prisma.user.delete({
          where: { id },
        });
        return { message: 'Usuario deletado com sucesso!' };
      } catch (error) {
        return { message: 'Erro ao deletar usuario!' };
      }
    });
  }
}
