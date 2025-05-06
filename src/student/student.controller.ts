import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentResponseDto } from './dto/students.dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: StudentResponseDto })
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: [StudentResponseDto] })
  async findAll(): Promise<StudentResponseDto[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: StudentResponseDto })
  async findOne(@Param('id') id: string): Promise<StudentResponseDto> {
    return this.studentService.findOne(Number(id));
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: StudentResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.studentService.update(Number(id), updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentService.remove(Number(id));
  }
}
