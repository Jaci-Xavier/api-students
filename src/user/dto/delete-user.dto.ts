import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    description: 'ID of the user to be deleted',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
