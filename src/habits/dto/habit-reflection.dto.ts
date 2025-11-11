import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class HabitReflectionDto {
  @ApiProperty({ example: 'I felt great after finishing my workout today.' })
  @IsString()
  @Length(3, 2000)
  text!: string;
}
