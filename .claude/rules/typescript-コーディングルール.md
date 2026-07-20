---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript コーディングルール

## 文字列リテラル

- 2 箇所以上で参照される文字列リテラル Union（ErrorCode・ステータス・種別・discriminated union のタグなど）
- `as const` Object と、その値型 `(typeof X)[keyof typeof X]` を同名で定義する。
- 変数名、メンバ名は PascalCase
- DB / 外部 API の値を表す場合はその値をそのまま使用する
- 内部の値はキーと同じ PascalCase に揃える

