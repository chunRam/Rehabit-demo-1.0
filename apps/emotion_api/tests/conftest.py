from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List

import pytest

# Ensure the repository root is on the Python path so ``apps`` can be imported.
ROOT = Path(__file__).resolve().parents[3]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from apps.emotion_api.app.services.inference import EmotionAnalyzer


@dataclass
class DummyEncoder:
    """A lightweight encoder for tests that avoids model downloads."""

    def encode(self, texts: Iterable[str]) -> List[List[float]]:
        if isinstance(texts, str):
            texts = [texts]
        return [self._vector_for(text) for text in texts]

    @staticmethod
    def _vector_for(text: str) -> List[float]:
        normalized = text.lower()
        if any(keyword in normalized for keyword in ["joy", "happy", "cheerful", "delighted"]):
            return [1.0, 0.0, 0.0]
        if any(keyword in normalized for keyword in ["sad", "down", "sorrow", "melancholy"]):
            return [0.0, 1.0, 0.0]
        if any(keyword in normalized for keyword in ["angry", "furious", "irritated", "annoyed"]):
            return [0.0, 0.0, 1.0]
        if any(keyword in normalized for keyword in ["afraid", "anxious", "worried", "scared"]):
            return [0.5, 0.5, 0.0]
        if any(keyword in normalized for keyword in ["surprised", "astonished", "amazed", "startled"]):
            return [0.6, 0.2, 0.2]
        return [0.33, 0.33, 0.34]


@pytest.fixture()
def dummy_emotion_analyzer() -> EmotionAnalyzer:
    return EmotionAnalyzer(encoder=DummyEncoder())
