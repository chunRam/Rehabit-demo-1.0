import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { HabitResponseDto } from './dto/habit-response.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { HabitReflectionDto } from './dto/habit-reflection.dto';
import { EmotionAnalysisResponse } from '../emotion/emotion.service';
import { Habit } from './entities/habit.entity';

@ApiTags('habits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  @ApiCreatedResponse({ type: HabitResponseDto })
  create(@CurrentUser() user: User, @Body() createHabitDto: CreateHabitDto): Promise<HabitResponseDto> {
    return this.habitsService.create(user.id, createHabitDto).then((habit) =>
      this.toResponse(habit)
    );
  }

  @Get()
  @ApiOkResponse({ type: [HabitResponseDto] })
  findAll(@CurrentUser() user: User): Promise<HabitResponseDto[]> {
    return this.habitsService
      .findAll(user.id)
      .then((habits) => habits.map((habit) => this.toResponse(habit)));
  }

  @Get(':id')
  @ApiOkResponse({ type: HabitResponseDto })
  findOne(@CurrentUser() user: User, @Param('id') id: string): Promise<HabitResponseDto> {
    return this.habitsService.findOne(user.id, id).then((habit) => this.toResponse(habit));
  }

  @Patch(':id')
  @ApiOkResponse({ type: HabitResponseDto })
  update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto
  ): Promise<HabitResponseDto> {
    return this.habitsService.update(user.id, id, updateHabitDto).then((habit) =>
      this.toResponse(habit)
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@CurrentUser() user: User, @Param('id') id: string): Promise<void> {
    await this.habitsService.remove(user.id, id);
  }

  @Post(':id/analyze')
  @ApiOkResponse({ description: 'Emotion analysis result' })
  analyzeReflection(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() reflectionDto: HabitReflectionDto
  ): Promise<EmotionAnalysisResponse | null> {
    return this.habitsService.analyzeReflection(user.id, id, reflectionDto.text);
  }

  private toResponse(habit: Habit): HabitResponseDto {
    return {
      id: habit.id,
      title: habit.title,
      description: habit.description,
      targetFrequency: habit.targetFrequency,
      userId: habit.userId,
      createdAt: habit.createdAt,
      updatedAt: habit.updatedAt
    };
  }
}
