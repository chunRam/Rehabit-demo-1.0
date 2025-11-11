# `/emotion/analyze`

Analyze a single text snippet, returning an emotion label along with the normalized
Sentence-Transformer embedding.

## Request

```http
POST /emotion/analyze
Content-Type: application/json

{
  "text": "오늘 하루는 너무 행복했어요!"
}
```

## Successful response

```json
{
  "label": "joy",
  "embedding": [
    0.032,
    -0.041,
    0.127,
    "... trimmed for brevity ..."
  ]
}
```

## Validation error response

```json
{
  "detail": [
    {
      "loc": ["body", "text"],
      "msg": "ensure this value has at least 1 characters",
      "type": "value_error.any_str.min_length",
      "ctx": {"limit_value": 1}
    }
  ]
}
```
