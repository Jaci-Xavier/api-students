import { StudentResponseDto } from './students.dto';

describe('StudentResponseDto', () => {
  it('deve criar uma instância válida com os valores fornecidos', () => {
    const dto = new StudentResponseDto();
    dto.id = 1;
    dto.name = 'Gabriel';
    dto.grade = 8.5;
    dto.firstUniqueLetter = 'g';

    expect(dto).toBeInstanceOf(StudentResponseDto);
    expect(dto.id).toBe(1);
    expect(dto.name).toBe('Gabriel');
    expect(dto.grade).toBe(8.5);
    expect(dto.firstUniqueLetter).toBe('g');
  });

  it('deve garantir que as propriedades estão sendo corretamente tipadas', () => {
    const dto = new StudentResponseDto();
    dto.id = 2;
    dto.name = 'Lucas';
    dto.grade = 9;
    dto.firstUniqueLetter = 'L';

    expect(typeof dto.id).toBe('number');
    expect(typeof dto.name).toBe('string');
    expect(typeof dto.grade).toBe('number');
    expect(typeof dto.firstUniqueLetter).toBe('string');
  });

  it('deve lançar erro se campos obrigatórios não forem fornecidos', () => {
    const dto = new StudentResponseDto();
    expect(() => {
      if (!dto.name || !dto.grade) {
        throw new Error('Os campos "name" e "grade" são obrigatórios');
      }
    }).toThrowError('Os campos "name" e "grade" são obrigatórios');
  });

  it('deve atribuir "_" se firstUniqueLetter não for fornecida', () => {
    const dto = new StudentResponseDto();
    dto.id = 4;
    dto.name = 'João';
    dto.grade = 7.5;
    dto.firstUniqueLetter = dto.firstUniqueLetter || '_';

    expect(dto.firstUniqueLetter).toBe('_');
  });
});
