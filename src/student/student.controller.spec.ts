import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { getFirstUniqueLetter } from '../common/utils/get-first-unique.util';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentResponseDto } from './dto/students.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudent = { 
    id: 1, 
    name: 'Alice', 
    grade: 90, 
    firstUniqueLetter: getFirstUniqueLetter('Alice') 
  };
  
  const mockStudents = [mockStudent];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockStudents),
            findOne: jest.fn().mockResolvedValue(mockStudent),
            create: jest.fn().mockResolvedValue(mockStudent),
            update: jest.fn().mockResolvedValue(mockStudent),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('deve retornar um array de estudantes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockStudents);
  });

  it('deve retornar um estudante por ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockStudent);
  });

  it('deve criar um estudante', async () => {
    const createStudentDto: CreateStudentDto = { name: 'Alice', grade: 90 };
    const result: StudentResponseDto = { id: 1, name: 'Alice', grade: 90, firstUniqueLetter: getFirstUniqueLetter('Alice') };

    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createStudentDto)).toEqual(result);
  });

  it('deve atualizar um estudante', async () => {
    const updateStudentDto: UpdateStudentDto = { name: 'Alice Updated', grade: 95 };
    const result: StudentResponseDto = { id: 1, name: 'Alice Updated', grade: 95, firstUniqueLetter: getFirstUniqueLetter('Alice Updated') };

    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', updateStudentDto)).toEqual(result);
  });

  it('deve remover um estudante', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    await expect(controller.remove('1')).resolves.not.toThrow();
  });
});
