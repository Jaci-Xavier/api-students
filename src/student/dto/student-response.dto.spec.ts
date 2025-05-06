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
});
