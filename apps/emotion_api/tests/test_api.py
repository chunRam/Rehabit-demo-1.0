from __future__ import annotations

import pytest

fastapi = pytest.importorskip("fastapi")
from fastapi.testclient import TestClient  # type: ignore  # noqa: E402

from apps.emotion_api.app.main import app, get_emotion_analyzer
from apps.emotion_api.app.schemas import EmotionAnalyzeResponse
from apps.emotion_api.app.services.inference import EmotionAnalyzer


def test_emotion_analyze_endpoint(dummy_emotion_analyzer: EmotionAnalyzer) -> None:
    app.dependency_overrides[get_emotion_analyzer] = lambda: dummy_emotion_analyzer
    client = TestClient(app)

    response = client.post("/emotion/analyze", json={"text": "I am furious about this"})

    assert response.status_code == 200
    data = EmotionAnalyzeResponse(**response.json())
    assert data.label == "anger"
    assert len(data.embedding) == 3

    app.dependency_overrides.clear()


def test_emotion_analyze_validation_error() -> None:
    client = TestClient(app)
    response = client.post("/emotion/analyze", json={"text": ""})

    assert response.status_code == 422
