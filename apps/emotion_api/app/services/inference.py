"""Utilities for loading the Sentence-Transformer model and performing inference."""
from __future__ import annotations

from functools import lru_cache
from math import sqrt
from typing import Dict, Iterable, List, Mapping, Sequence

try:  # pragma: no cover - exercised implicitly in production
    from sentence_transformers import SentenceTransformer
except ModuleNotFoundError:  # pragma: no cover - simplifies local testing without deps
    class SentenceTransformer:  # type: ignore[misc]
        """Fallback shim used when sentence-transformers is unavailable."""

        def __init__(self, *args: object, **kwargs: object) -> None:  # noqa: D401
            raise ImportError(
                "sentence-transformers must be installed to use EmotionAnalyzer"
            )

        def encode(self, *args: object, **kwargs: object) -> List[List[float]]:
            raise ImportError(
                "sentence-transformers must be installed to use EmotionAnalyzer"
            )


DEFAULT_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
DEFAULT_EMOTION_TEMPLATES: Mapping[str, Sequence[str]] = {
    "joy": ["joy", "happy", "cheerful", "delighted"],
    "sadness": ["sad", "down", "sorrowful", "melancholy"],
    "anger": ["angry", "furious", "irritated", "annoyed"],
    "fear": ["afraid", "anxious", "worried", "scared"],
    "surprise": ["surprised", "astonished", "amazed", "startled"],
    "neutral": ["neutral", "calm", "indifferent", "steady"],
}


def _mean(vectors: Sequence[Sequence[float]]) -> List[float]:
    totals = [0.0 for _ in vectors[0]]
    for vector in vectors:
        for index, value in enumerate(vector):
            totals[index] += value
    count = float(len(vectors))
    return [value / count for value in totals]


class EmotionAnalyzer:
    """Performs embedding extraction and emotion labelling."""

    def __init__(
        self,
        model_name: str = DEFAULT_MODEL,
        *,
        encoder: SentenceTransformer | None = None,
        emotion_templates: Mapping[str, Sequence[str]] = DEFAULT_EMOTION_TEMPLATES,
    ) -> None:
        self.model_name = model_name
        self._encoder = encoder
        self._emotion_templates = dict(emotion_templates)
        self._prototype_embeddings = self._build_prototype_embeddings()

    @property
    def encoder(self) -> SentenceTransformer:
        if self._encoder is None:
            self._encoder = SentenceTransformer(self.model_name)
        return self._encoder

    def _build_prototype_embeddings(self) -> Dict[str, List[float]]:
        prototypes: Dict[str, List[float]] = {}
        for label, templates in self._emotion_templates.items():
            embeddings = [list(row) for row in self.encoder.encode(list(templates))]
            prototypes[label] = self._normalize(_mean(embeddings))
        return prototypes

    @staticmethod
    def _normalize(vector: Sequence[float]) -> List[float]:
        norm = sqrt(sum(value * value for value in vector))
        if norm == 0:
            return list(vector)
        return [value / norm for value in vector]

    @staticmethod
    def _cosine_similarity(a: Sequence[float], b: Sequence[float]) -> float:
        return sum(x * y for x, y in zip(a, b))

    def embed_text(self, text: str) -> List[float]:
        embedding = list(self.encoder.encode([text])[0])
        return self._normalize(embedding)

    def label_emotion(self, embedding: Iterable[float]) -> str:
        vector = self._normalize(list(embedding))
        similarities = {
            label: self._cosine_similarity(vector, proto)
            for label, proto in self._prototype_embeddings.items()
        }
        return max(similarities.items(), key=lambda item: item[1])[0]

    def analyze(self, text: str) -> tuple[str, List[float]]:
        embedding = self.embed_text(text)
        label = self.label_emotion(embedding)
        return label, embedding


@lru_cache(maxsize=1)
def get_default_analyzer() -> EmotionAnalyzer:
    """Return a cached EmotionAnalyzer instance."""

    return EmotionAnalyzer()
