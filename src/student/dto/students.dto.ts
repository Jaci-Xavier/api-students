import { ApiProperty } from '@nestjs/swagger';

export class StudentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Gabriel' })
  name: string;

  @ApiProperty({ example: 8.5 })
  grade: number;

  @ApiProperty({ example: 'g', description: 'Primeira letra única do nome ou "_" se não houver' })
  firstUniqueLetter: string;
}
