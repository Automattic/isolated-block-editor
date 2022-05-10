import { test, expect } from '@playwright/test';

test('Inspector button works', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/isolated-block-editor--toolbar-settings');
    const editor = page.frameLocator('#storybook-preview-iframe');
     
    await editor.locator('[aria-label="Settings"]').click();

    await expect(editor.locator('[aria-label="Document (selected)"]')).toBeVisible();
    await expect(editor.locator('[aria-label="Block"]')).toBeVisible();

    await editor.locator('[aria-label="Close settings"]').click();
    
    await expect(editor.locator('[aria-label="Document (selected)"]')).not.toBeVisible();
    await expect(editor.locator('[aria-label="Block"]')).not.toBeVisible();
});