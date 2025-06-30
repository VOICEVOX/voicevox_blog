import { defineConfig, devices } from "@playwright/test";

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

  use: {
    trace: "on-first-retry",
    baseURL: "http://localhost:4321",
  },

  webServer: {
    command: "pnpm preview",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
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
