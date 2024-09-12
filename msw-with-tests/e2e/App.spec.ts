import { test, expect } from '@playwright/test';
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers/index.ts';

const server = setupServer(...handlers);
const baseUrl = 'http://localhost:5173/'

test.beforeAll(() => {
  server.listen();
});

test.afterAll(() => {
  server.close();
});

test.beforeEach(() => {
  server.resetHandlers();
});

test('должен загрузить посты при открытии страницы', async ({ page }) => {
  await page.goto(baseUrl);

  const postTitles = await page.locator('ul li h2');
  await expect(postTitles).toHaveCount(15);
  await expect(postTitles.first()).toContainText('');
});

test('должен создать новый пост', async ({ page }) => {
  await page.goto(baseUrl);

  const postData = {
    title: 'New Post Title',
    description: 'This is the body of the new post.',
  }

  await page.fill('input', postData.title);
  await page.fill('textarea', postData.description);

  await page.click('button[type="submit"]');

  const postTitles = await page.locator('ul li h2');
  await expect(postTitles.first()).toContainText(postData.title);
});

test('должен показывать ошибку при отсутствии тела поста', async ({ page }) => {
  await page.goto(baseUrl);

  await page.fill('input', 'New Post Without Body');
  await page.fill('textarea', '');

  await page.click('button[type="submit"]');

  const errorMessage = await page.locator('p.text-red-500').first();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Body is required');
});