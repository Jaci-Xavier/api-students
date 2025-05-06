import { IsString, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Nome do estudante',
    example: 'Gabriel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'Nota do estudante (de 0.0 a 10.0, com no máximo uma casa decimal)',
    example: 8.5,
    minimum: 0,
    maximum: 10,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  grade: number;
}
