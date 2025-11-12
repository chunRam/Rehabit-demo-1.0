"""FastAPI application exposing the emotion analysis endpoint."""
from __future__ import annotations

from fastapi import Depends, FastAPI

from .schemas import EmotionAnalyzeRequest, EmotionAnalyzeResponse
from .services.inference import EmotionAnalyzer, get_default_analyzer

app = FastAPI(
    title="Emotion Analysis API",
    version="0.1.0",
    description="Analyze text and return emotion labels with Sentence-Transformer embeddings.",
)


def get_emotion_analyzer() -> EmotionAnalyzer:
    """Dependency that returns the configured emotion analyzer."""

    return get_default_analyzer()


@app.post("/emotion/analyze", response_model=EmotionAnalyzeResponse)
def analyze_emotion(
    payload: EmotionAnalyzeRequest, analyzer: EmotionAnalyzer = Depends(get_emotion_analyzer)
) -> EmotionAnalyzeResponse:
    """Return the predicted emotion label and embedding for the supplied text."""

    label, embedding = analyzer.analyze(payload.text)
    return EmotionAnalyzeResponse(label=label, embedding=embedding)


@app.get("/health", tags=["system"])
def healthcheck() -> dict[str, str]:
    """Basic health-check endpoint."""

    return {"status": "ok"}
