import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { getFirstUniqueLetter } from '../common/utils/get-first-unique.util';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentService', () => {
  let service: StudentService;
  let prisma: Partial<PrismaService>;

  const mockStudent = { id: 1, name: 'Alice', grade: 90, firstUniqueLetter: getFirstUniqueLetter('Alice') };
  const mockStudents = [mockStudent];

  beforeEach(async () => {
    prisma = {
      student: {
        create: jest.fn().mockResolvedValue(mockStudent),
        findMany: jest.fn().mockResolvedValue(mockStudents),
        findUnique: jest.fn().mockResolvedValue(mockStudent),
        update: jest.fn().mockResolvedValue(mockStudent),
        delete: jest.fn().mockResolvedValue(mockStudent),
      },
    } as unknown as PrismaService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('deve criar um estudante', async () => {
    const data = { name: 'Alice', grade: 90, firstUniqueLetter: getFirstUniqueLetter('Alice') };
    (prisma.student?.create as jest.Mock).mockResolvedValue(mockStudent);

    const result = await service.create(data);
    expect(prisma.student?.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual(mockStudent);
  });

  it('deve listar todos os estudantes', async () => {
    (prisma.student?.findMany as jest.Mock).mockResolvedValue(mockStudents);

    const result = await service.findAll();
    expect(prisma.student?.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockStudents);
  });

  it('deve encontrar um estudante por ID', async () => {
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(mockStudent);

    const result = await service.findOne(1);
    expect(prisma.student?.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockStudent);
  });

  it('deve lançar um erro se estudante não for encontrado', async () => {
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um estudante', async () => {
    const updateStudentDto: UpdateStudentDto = { name: 'Alice Updated', grade: 95 };
    const updatedStudent = { ...mockStudent, ...updateStudentDto };

    (prisma.student?.update as jest.Mock).mockResolvedValue(updatedStudent);

    const result = await service.update(1, updateStudentDto);
    expect(prisma.student?.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...updateStudentDto, firstUniqueLetter: getFirstUniqueLetter('Alice Updated') },
    });
    expect(result).toEqual(updatedStudent);
  });

  it('deve lançar um erro se tentar atualizar um estudante não encontrado', async () => {
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.update(999, { name: 'NotFound', grade: 100 })).rejects.toThrow(NotFoundException);
  });

  it('deve remover um estudante', async () => {
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(mockStudent);
    (prisma.student?.delete as jest.Mock).mockResolvedValue(mockStudent);

    await expect(service.remove(1)).resolves.not.toThrow();
    expect(prisma.student?.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('deve lançar um erro se tentar remover um estudante não encontrado', async () => {
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });

  it('deve chamar getFirstUniqueLetter durante a criação do estudante', async () => {
    const data = { name: 'Alice', grade: 90, firstUniqueLetter: getFirstUniqueLetter('Alice') };

    const spy = jest.spyOn(require('../common/utils/get-first-unique.util'), 'getFirstUniqueLetter').mockReturnValue('A');

    await service.create(data);

    expect(spy).toHaveBeenCalledWith('Alice');

    spy.mockRestore();
  });

  it('deve usar o nome atual do estudante se nome não for fornecido no update', async () => {
    const updateStudentDto: UpdateStudentDto = { grade: 95 };
    const updatedStudent = {
      ...mockStudent,
      grade: updateStudentDto.grade,
      firstUniqueLetter: getFirstUniqueLetter(mockStudent.name),
    };
  
    (prisma.student?.findUnique as jest.Mock).mockResolvedValue(mockStudent);
    (prisma.student?.update as jest.Mock).mockResolvedValue(updatedStudent);
  
    const result = await service.update(1, updateStudentDto);
    expect(prisma.student?.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        ...updateStudentDto,
        firstUniqueLetter: getFirstUniqueLetter(mockStudent.name),
      },
    });
    expect(result).toEqual(updatedStudent);
  });
  
});
