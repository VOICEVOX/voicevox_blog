import { defineConfig, devices } from "@playwright/test";

const strictUsePreview = process.env.STRICT_USE_PREVIEW === "1"; // NOTE: 必ず preview サーバーを使うモード

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["html", { open: "never" }], ["github"]]
    : [["html", { open: "on-failure" }]],
  timeout: 90 * 1000,

  webServer: strictUsePreview
    ? {
        command: "pnpm preview",
        reuseExistingServer: false,
        wait: {
          stdout: /(?<playwright_test_base_url>https?:\/\/\S+:\d+)/,
        },
      }
    : {
        command: "pnpm preview",
        url: "http://localhost:4321",
        reuseExistingServer: !process.env.CI,
      },

  use: {
    trace: "on-first-retry",
    ...(strictUsePreview ? {} : { baseURL: "http://localhost:4321" }),
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "iPhone X",
      use: { ...devices["iPhone X"], defaultBrowserType: "chromium" },
      testIgnore: [
        "tests/e2e/meta/**/*.spec.ts",
        "tests/e2e/sitemap/**/*.spec.ts",
      ],
    },
  ],
});
