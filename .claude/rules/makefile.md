---
paths:
  - "**/Makefile"
---

# Makefile

## 自己文書化スタイルの help

- 各ターゲットにはターゲット行の末尾に `## 説明` 形式でコメントを記載する
- `help` ターゲットを用意し、`## 説明` を抽出して一覧表示する
- `.DEFAULT_GOAL := help` を設定する

```make
.DEFAULT_GOAL := help

.PHONY: help
help: ## このヘルプを表示
	@awk 'BEGIN {FS = ":[^#]*?## "} /^[a-zA-Z][a-zA-Z_-]*:.*?## / {printf "make %s: %s\n", $$1, $$2}' $(firstword $(MAKEFILE_LIST))
```

## .PHONY

先頭にまとめて記載せず、各ターゲットの直前の行に個別に記載する

```make
.PHONY: dev
dev: ## 開発サーバー起動
	...

.PHONY: lint
lint: ## lint 実行
	...
```
