import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentResponseDto } from './dto/students.dto';
import { getFirstUniqueLetter } from '../common/utils/get-first-unique.util';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const firstUniqueLetter = getFirstUniqueLetter(createStudentDto.name.toLocaleLowerCase());

    const student = await this.prisma.student.create({
      data: {
        ...createStudentDto,
        firstUniqueLetter,
      },
    });

    return {
      id: student.id,
      name: student.name,
      grade: student.grade,
      firstUniqueLetter: student.firstUniqueLetter,
    };
  }

  async findOne(id: number): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return {
      id: student.id,
      name: student.name,
      grade: student.grade,
      firstUniqueLetter: student.firstUniqueLetter,
    };
  }

  async findAll(): Promise<StudentResponseDto[]> {
    const students = await this.prisma.student.findMany();

    return students.map((student) => ({
      id: student.id,
      name: student.name,
      grade: student.grade,
      firstUniqueLetter: student.firstUniqueLetter,
    }));
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
        firstUniqueLetter: getFirstUniqueLetter(
          updateStudentDto.name || student.name,
        ),
      },
    });

    return {
      id: updatedStudent.id,
      name: updatedStudent.name,
      grade: updatedStudent.grade,
      firstUniqueLetter: updatedStudent.firstUniqueLetter,
    };
  }

  async remove(id: number): Promise<void> {
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.prisma.student.delete({ where: { id } });
  }
}
