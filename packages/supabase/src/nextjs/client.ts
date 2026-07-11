import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "./public-config";

export function createClient() {
  const { url, publicKey } = getSupabasePublicConfig();

  return createBrowserClient(url, publicKey);
}
