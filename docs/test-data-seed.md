# 테스트 데이터 시드 가이드

테스트 및 QA 환경에서 일관된 데이터를 확보하기 위해 시드 스크립트를 구성해야 합니다. 아래 예시는 NestJS API와 FastAPI(ML 서비스), 모바일 앱이 동일한 샘플 데이터를 사용할 수 있도록 정리한 가이드입니다.

## 환경 변수
```
NODE_ENV=staging
ML_SERVICE_URL=http://localhost:5005
SENTRY_DSN=<sentry-dsn>
DATADOG_AGENT_URL=http://localhost:8126
```

## 사용자 계정
| 구분 | 이메일 | 비밀번호 | 설명 |
| --- | --- | --- | --- |
| 일반 사용자 | qa.user@rehabit.app | Rehabit!123 | 주요 사용자 플로우 검증용 |
| 프리미엄 사용자 | qa.premium@rehabit.app | Rehabit!123 | 구독 및 결제 관련 시나리오 |
| 관리자 | qa.admin@rehabit.app | Rehabit!123 | 어드민 대시보드 확인용 |

## 프로그램/습관 데이터
- **Hydration Reset** (program_id: `hydration-reset`)
  - `hydrate-morning`: 아침 기상 후 250ml 물 섭취
  - `hydrate-afternoon`: 오후 업무 중 250ml 물 섭취 기록
- **Sleep Reset** (program_id: `sleep-reset`)
  - `sleep-log`: 지난 밤 수면 시간 기록
  - `sleep-habit`: 취침 전 루틴 체크리스트 작성

## FastAPI 예측 엔드포인트 시드
샘플 모델 응답을 다음과 같이 구성해 두면 통합 테스트 및 스모크 테스트에서 일관된 결과를 확인할 수 있습니다.

```json
{
  "model": "mock-fastapi",
  "prediction": {
    "recommendedAction": "drink-water",
    "confidence": 0.87
  }
}
```

FastAPI 앱의 `/predict` 핸들러는 요청에 포함된 `userId`, `habit`, `context` 필드를 검증하고 위 응답을 반환하도록 구성합니다.

## 실행 절차
1. 데이터베이스를 초기화합니다(`npm run db:reset` 등 환경에 맞는 명령 사용).
2. 위 표에 있는 계정과 프로그램/습관 데이터를 시드 스크립트에 추가합니다.
3. FastAPI 서비스에서 모델 응답 시드를 적용하고 `/predict` 호출 시 동일한 JSON을 반환하도록 설정합니다.
4. Sentry/Datadog 설정 값이 올바르게 입력되었는지 다시 확인합니다.
5. `npm run test:integration` 및 `npm run test:mobile` 명령을 실행하여 모든 플로우가 정상 동작하는지 확인합니다.
