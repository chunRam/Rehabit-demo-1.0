import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmotionService } from './emotion.service';

@Module({
  imports: [HttpModule],
  providers: [EmotionService],
  exports: [EmotionService]
})
export class EmotionModule {}
