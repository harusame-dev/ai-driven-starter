import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicConfig } from "./public-config";

export function createClient(request: NextRequest) {
  const { url, publicKey } = getSupabasePublicConfig();

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, publicKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  return {
    supabase,
    // setAll でレスポンスが作り直されるため、supabase の呼び出しが終わった後に取得すること
    // （プロパティにすると分割代入時に古いレスポンスを掴んでしまうためメソッドにしている）
    getResponse: () => supabaseResponse,
  };
}

export async function updateSession(request: NextRequest) {
  const { supabase, getResponse } = createClient(request);

  // 期限切れのセッションをリフレッシュする
  await supabase.auth.getUser();

  return getResponse();
}
