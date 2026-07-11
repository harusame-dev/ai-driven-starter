import * as v from "valibot";

const privateConfigSchema = v.object({
  secretKey: v.pipe(
    v.string("SUPABASE_SECRET_KEY を設定してください"),
    v.nonEmpty("SUPABASE_SECRET_KEY を設定してください"),
  ),
});

// モジュール読み込み時にパースし、環境変数の不備をビルド時点で検出する
// NEXT_PUBLIC_ プレフィックスがないためクライアントバンドルには含まれない（サーバー専用）
const privateConfig = v.parse(privateConfigSchema, {
  secretKey: process.env.SUPABASE_SECRET_KEY,
});

export function getSupabasePrivateConfig() {
  return privateConfig;
}
