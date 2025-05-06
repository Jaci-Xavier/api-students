import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateStudentDto } from './create-student.dto';

describe('CreateStudentDto Validation', () => {
  it('deve falhar se name estiver vazio', async () => {
    const dto = plainToInstance(CreateStudentDto, { name: '', grade: 8.5 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });

  it('deve falhar se grade estiver ausente', async () => {
    const dto = plainToInstance(CreateStudentDto, { name: 'Gabriel' });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'grade')).toBe(true);
  });

  it('deve falhar se grade for maior que 10', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      name: 'Gabriel',
      grade: 10.5,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'grade')).toBe(true);
  });

  it('deve falhar se grade tiver mais de uma casa decimal', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      name: 'Gabriel',
      grade: 8.55,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'grade')).toBe(true);
  });

  it('deve passar com dados válidos', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      name: 'Gabriel',
      grade: 9.5,
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
