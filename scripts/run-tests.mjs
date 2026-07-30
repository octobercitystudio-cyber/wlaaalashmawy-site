import { spawnSync } from "node:child_process";

const requiredShim = "--require=./scripts/node-platform-shim.cjs";
const existingOptions = process.env.NODE_OPTIONS?.trim();
const env = {
  ...process.env,
  NODE_OPTIONS: existingOptions
    ? `${existingOptions} ${requiredShim}`
    : requiredShim,
};

const result = spawnSync(
  process.execPath,
  ["./node_modules/tsx/dist/cli.mjs", "--test", "tests/helpers.test.ts"],
  { cwd: process.cwd(), env, stdio: "inherit" },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
