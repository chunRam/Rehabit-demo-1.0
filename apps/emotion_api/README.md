# Emotion Analysis FastAPI Service

This service exposes a `/emotion/analyze` endpoint backed by a Sentence-Transformer
model. It receives text and returns both the predicted emotion label and the
normalized embedding vector.

## Setup

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Testing

```bash
pytest
```

Documentation for the request/response contract lives in
[`docs/emotion_analyze.md`](docs/emotion_analyze.md).
