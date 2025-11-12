from __future__ import annotations

from apps.emotion_api.app.services.inference import EmotionAnalyzer


def test_analyze_returns_label_and_embedding(dummy_emotion_analyzer: EmotionAnalyzer) -> None:
    label, embedding = dummy_emotion_analyzer.analyze("I feel cheerful and delighted today!")

    assert label == "joy"
    assert isinstance(embedding, list)
    assert len(embedding) == 3


def test_label_changes_with_text(dummy_emotion_analyzer: EmotionAnalyzer) -> None:
    label_happy, _ = dummy_emotion_analyzer.analyze("Life is happy")
    label_sad, _ = dummy_emotion_analyzer.analyze("This is a sad story")

    assert label_happy != label_sad
    assert {label_happy, label_sad} <= {"joy", "sadness"}
