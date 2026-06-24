// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Force nitro on with the Vercel preset when building outside the Lovable
  // sandbox (e.g. on Vercel's build infra). Inside the Lovable sandbox the
  // wrapper still forces its own Cloudflare preset, so local dev/preview is
  // unaffected. NITRO_PRESET env var still wins if set.
  nitro: { preset: "vercel" },
});
