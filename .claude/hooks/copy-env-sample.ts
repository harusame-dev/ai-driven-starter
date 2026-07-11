// SessionStart hook: .env.sample があるフォルダに .env がなければ .env.sample をコピーする
import { Glob } from "bun";
import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const ignoredDirs = new Set(["node_modules", ".git"]);

const copied: string[] = [];

for await (const relPath of new Glob("**/.env.sample").scan({
  cwd: root,
  dot: true,
})) {
  if (relPath.split("/").some((segment) => ignoredDirs.has(segment))) continue;

  const dir = dirname(relPath);
  const envPath = join(root, dir, ".env");
  if (existsSync(envPath)) continue;

  await copyFile(join(root, relPath), envPath);
  copied.push(join(dir, ".env"));
}

if (copied.length > 0) {
  console.log(
    JSON.stringify({
      systemMessage: `.env.sample から .env を作成しました: ${copied.join(", ")}`,
    }),
  );
}
