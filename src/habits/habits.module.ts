import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { Habit } from './entities/habit.entity';
import { EmotionModule } from '../emotion/emotion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), EmotionModule],
  controllers: [HabitsController],
  providers: [HabitsService],
  exports: [HabitsService]
})
export class HabitsModule {}
