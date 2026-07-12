---
paths:
  - *.client.tsx
---

# Client Component

## Client Component の範囲を最小限に抑える

例えばボタン表示を制御するために state が必要な場合、
ページ全体や使用するコンポーネントを client component にするのではなく、
state をもったボタンとして client component に切り出す

client component を作成した時は client component の範囲が最小になっているか入念にチェックする

