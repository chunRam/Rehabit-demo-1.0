import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

export interface EmotionAnalysisResponse {
  sentiment: string;
  confidence: number;
  raw?: Record<string, unknown>;
}

@Injectable()
export class EmotionService {
  private readonly logger = new Logger(EmotionService.name);
  private readonly baseUrl = process.env.EMOTION_API_URL ?? 'http://localhost:8000/analyze';

  constructor(private readonly httpService: HttpService) {}

  async analyzeEmotion(text: string): Promise<EmotionAnalysisResponse | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<EmotionAnalysisResponse>(this.baseUrl, { text })
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.logger.error('Emotion analysis failed', axiosError.stack);
      return null;
    }
  }
}
