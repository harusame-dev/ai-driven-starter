import * as v from "valibot";

const publicConfigSchema = v.object({
  url: v.pipe(
    v.string("NEXT_PUBLIC_SUPABASE_URL を設定してください"),
    v.url("NEXT_PUBLIC_SUPABASE_URL は URL 形式で設定してください"),
  ),
  publicKey: v.pipe(
    v.string("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY を設定してください"),
    v.nonEmpty("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY を設定してください"),
  ),
});

// モジュール読み込み時にパースし、環境変数の不備をビルド時点で検出する
const publicConfig = v.parse(publicConfigSchema, {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  publicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});

export function getSupabasePublicConfig() {
  return publicConfig;
}
