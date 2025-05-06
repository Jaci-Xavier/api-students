import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUsuarioDto } from "./dto/create-user.dto";

@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() data: CreateUsuarioDto) {
        return await this.userService.create(data);
    }

    @Delete("/:id")
    @HttpCode(204)
    async delete(@Param("id") id: string) {
        return await this.userService.delete(id);
    }
}
