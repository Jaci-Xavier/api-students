import { UpdateStudentDto } from './update-student.dto';
import { validateSync } from 'class-validator';

describe('UpdateStudentDto', () => {
  it('deve ser válido com name e grade corretos', () => {
    const dto = new UpdateStudentDto();
    dto.name = 'Gabriel';
    dto.grade = 8.5;

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('deve permitir ausência de campos (todos opcionais)', () => {
    const dto = new UpdateStudentDto();
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('deve invalidar se name não for string', () => {
    const dto = new UpdateStudentDto();
    // @ts-expect-error proposital para teste
    dto.name = 123;

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('deve invalidar se grade não for número', () => {
    const dto = new UpdateStudentDto();
    // @ts-expect-error proposital para teste
    dto.grade = 'nota';

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('grade');
  });

  it('deve invalidar se grade tiver mais de uma casa decimal', () => {
    const dto = new UpdateStudentDto();
    dto.grade = 8.55;

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('grade');
  });

  it('deve invalidar se grade for menor que 0 ou maior que 10', () => {
    const dto1 = new UpdateStudentDto();
    dto1.grade = -1;

    const dto2 = new UpdateStudentDto();
    dto2.grade = 10.5;

    const errors1 = validateSync(dto1);
    const errors2 = validateSync(dto2);

    expect(errors1.length).toBeGreaterThan(0);
    expect(errors2.length).toBeGreaterThan(0);
  });
});
