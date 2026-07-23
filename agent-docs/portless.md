# portless 運用

worktree 並列開発時の dev サーバーポート衝突を避けるため、[portless](https://www.npmjs.com/package/portless)（名前付き URL のローカル HTTPS プロキシ）を使用する。`dev` スクリプトは必ず portless 経由で起動する（`dev:portless` のような別スクリプトは作らない）。

## proxy の運用

- proxy は **ポート 1355**（portless が 443 を使わない場合の標準フォールバックポート。sudo 不要）で常駐する
- したがって名前付き URL は必ず **`:1355` 付き**で表記する（例: `https://web.ai-driven-starter.＜checkout名＞.localhost:1355`）
  - `.env.sample`・Makefile・ドキュメント等に URL を書くときも `:1355` を付けること
- proxy は `portless <name> <cmd>` の実行時に自動起動する。状態確認は `portless doctor` / `portless list`

## URL の命名規則

```
https://<アプリ>.<プロダクト>.<checkout名>.localhost:1355
```

- `<checkout名>` はリポジトリ toplevel のディレクトリ名を `scripts/worktree-host-name.sh` でサニタイズした値（小文字・数字・ハイフン以外を `-` に置換）
  - ホスト名に使えない文字（大文字・`_` など）を portless が拒否するため、**checkout 名の導出は必ずこのスクリプトを使う**こと（インラインで再実装しない）

## dev スクリプトのパターン

```jsonc
// apps/<アプリ>/package.json（リポジトリルートから 2 階層下にある前提）
"dev": "portless web.<プロダクト>.$(../../scripts/worktree-host-name.sh) next dev"
```

- portless は子プロセスに `PORT`（採番した空きポート）・`HOST`（127.0.0.1）・`PORTLESS_URL`（公開 URL）を注入する。Next.js は `PORT` を自動で読む
- アプリのポートを固定したい場合は `PORTLESS_APP_PORT` を指定する（e2e などが raw ポートを直叩きする場合に使う）
- portless を介さない素の起動が必要な場合は `PORTLESS=0 pnpm dev`

## 制約・トラブルシュート

- 多階層 `.localhost` 名は Chrome / Chromium 系（Playwright 含む）が内部で解決する。**Safari・curl・システムリゾルバは解決できない**（`portless hosts sync` に sudo が必要）ため、動作確認は Chrome 系で行う
- HTTPS は portless のローカル CA を使う。CA は OS の信頼ストアに登録済み（`portless trust`）
- proxy 経由で 502 になる場合は、アプリが IPv6（`::1`）のみで listen していないか確認する（portless は 127.0.0.1 へ転送する。注入される `HOST` に bind すること）
