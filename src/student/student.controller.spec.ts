import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { getFirstUniqueLetter } from '../common/utils/get-first-unique.util';  // Certifique-se de que essa função está sendo importada corretamente

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  // Mock de dados com o valor correto de firstUniqueLetter
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
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('deve retornar um array de estudantes', async () => {
    const result = await controller.findAll();
    // Certifique-se de que a resposta seja comparada corretamente
    expect(result).toEqual(mockStudents);
  });

  it('deve retornar um estudante por ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockStudent);
  });
});
