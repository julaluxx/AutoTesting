import { defineConfig } from "@playwright/test";
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.ENV || 'dev';

dotenv.config({ path: path.resolve(__dirname, `configs/.env.${ENV}`) });

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
console.log(`ENV=${ENV} | BASE_URL=${baseURL}`);

export default defineConfig({
    testDir: './tests',
    use: {
        headless: true,
        baseURL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        launchOptions: {
            slowMo: 1000,
        }
    },
});