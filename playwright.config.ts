import { PlaywrightTestConfig } from '@playwright/test';
import { ENV } from './src/config/data';
import { COMMON_HEADERS } from './src/config/headers';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: ENV.BASE_URL,
    extraHTTPHeaders: COMMON_HEADERS,
  },
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
};

export default config; 