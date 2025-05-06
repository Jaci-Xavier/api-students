import { IsString, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty({
    description: 'Nome do estudante',
    example: 'Gabriel',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Nota do estudante (de 0.0 a 10.0, com no máximo uma casa decimal)',
    example: 8.5,
    minimum: 0,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 1 })
  @Min(0)
  @Max(10)
  grade?: number;
}
