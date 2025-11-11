import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitsService } from './habits.service';
import { Habit } from './entities/habit.entity';
import { EmotionService } from '../emotion/emotion.service';

const habitEntity: Habit = {
  id: '1',
  title: 'Read',
  description: 'Read books',
  targetFrequency: 'daily',
  userId: 'user1',
  createdAt: new Date(),
  updatedAt: new Date(),
  user: undefined
};

describe('HabitsService', () => {
  let service: HabitsService;
  let repo: jest.Mocked<Repository<Habit>>;
  let emotionService: jest.Mocked<EmotionService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        {
          provide: getRepositoryToken(Habit),
          useValue: {
            create: jest.fn().mockReturnValue(habitEntity),
            save: jest.fn().mockResolvedValue(habitEntity),
            find: jest.fn().mockResolvedValue([habitEntity]),
            findOne: jest.fn().mockResolvedValue(habitEntity),
            update: jest.fn(),
            delete: jest.fn()
          }
        },
        {
          provide: EmotionService,
          useValue: {
            analyzeEmotion: jest.fn().mockResolvedValue({ sentiment: 'positive', confidence: 0.9 })
          }
        }
      ]
    }).compile();

    service = module.get(HabitsService);
    repo = module.get(getRepositoryToken(Habit));
    emotionService = module.get(EmotionService);
  });

  it('creates a habit for a user', async () => {
    const result = await service.create('user1', {
      title: 'Read',
      description: 'Read books',
      targetFrequency: 'daily'
    });

    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(habitEntity);
  });

  it('returns emotion analysis', async () => {
    const result = await service.analyzeReflection('user1', '1', 'Feeling good');
    expect(emotionService.analyzeEmotion).toHaveBeenCalledWith('Feeling good');
    expect(result).toEqual({ sentiment: 'positive', confidence: 0.9 });
  });
});
