import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { getFirstUniqueLetter } from '../common/utils/get-first-unique.util';

describe('StudentService', () => {
  let service: StudentService;
  let prisma: Partial<PrismaService>;

  // Dados de exemplo para os testes
  const mockStudent = { id: 1, name: 'Alice', grade: 90, firstUniqueLetter: getFirstUniqueLetter('Alice') };
  const mockStudents = [mockStudent];

  beforeEach(async () => {
    // Criamos um PrismaService mockado
    prisma = {
      student: {
        create: jest.fn().mockResolvedValue(mockStudent),
        findMany: jest.fn().mockResolvedValue(mockStudents),
        findUnique: jest.fn().mockResolvedValue(mockStudent),
      },
    } as unknown as PrismaService;

    // Módulo de teste com StudentService real e PrismaService mockado
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
});
