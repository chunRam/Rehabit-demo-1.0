"""Pydantic schemas for the emotion analysis API."""
from __future__ import annotations

from typing import List

from pydantic import BaseModel, Field


class EmotionAnalyzeRequest(BaseModel):
    """Request body for the /emotion/analyze endpoint."""

    text: str = Field(..., min_length=1, description="Text to analyze")


class EmotionAnalyzeResponse(BaseModel):
    """Response body for the /emotion/analyze endpoint."""

    label: str = Field(..., description="Predicted emotion label")
    embedding: List[float] = Field(
        ..., description="Sentence-Transformer embedding for the supplied text"
    )

    class Config:
        schema_extra = {
            "example": {
                "label": "joy",
                "embedding": [
                    0.032,
                    -0.041,
                    0.127,
                ],
            }
        }
