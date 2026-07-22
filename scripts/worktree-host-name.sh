#!/usr/bin/env bash
set -eo pipefail

# portless のホスト名に使える checkout 識別子（worktree ディレクトリ名）を出力する。
# portless 内部の sanitizeForHostname と同じ規則（小文字・数字・ハイフン以外を - に置換し、
# 連続・前後のハイフンを整理）に揃える
basename "$(git rev-parse --show-toplevel)" |
  tr '[:upper:]' '[:lower:]' |
  sed -E 's/[^a-z0-9-]+/-/g; s/^-+//; s/-+$//'
