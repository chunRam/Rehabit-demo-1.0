import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateHabitDto {
  @ApiProperty({ example: 'Drink Water' })
  @IsString()
  @Length(1, 255)
  title!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: 'daily' })
  @IsOptional()
  @IsString()
  targetFrequency?: string;
}
