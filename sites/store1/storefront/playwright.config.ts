import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
  },
};

export default config;
