import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entities/habit.entity';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { EmotionService, EmotionAnalysisResponse } from '../emotion/emotion.service';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitsRepository: Repository<Habit>,
    private readonly emotionService: EmotionService
  ) {}

  async create(userId: string, createHabitDto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitsRepository.create({
      ...createHabitDto,
      userId
    });
    return this.habitsRepository.save(habit);
  }

  findAll(userId: string): Promise<Habit[]> {
    return this.habitsRepository.find({ where: { userId } });
  }

  async findOne(userId: string, id: string): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({ where: { id, userId } });
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }
    return habit;
  }

  async update(userId: string, id: string, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    await this.findOne(userId, id);
    await this.habitsRepository.update(id, updateHabitDto);
    return this.findOne(userId, id);
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.findOne(userId, id);
    await this.habitsRepository.delete({ id, userId });
  }

  async analyzeReflection(
    userId: string,
    id: string,
    reflection: string
  ): Promise<EmotionAnalysisResponse | null> {
    await this.findOne(userId, id);
    return this.emotionService.analyzeEmotion(reflection);
  }
}
