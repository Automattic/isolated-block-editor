import { test, expect } from '@playwright/test';

test('Toolbar settings botton', async ({ page }) => {
    await page.goto('/?path=/story/isolated-block-editor--toolbar-settings');
    const editor = page.frameLocator('#storybook-preview-iframe');
     
    await editor.locator('[aria-label="Settings"]').click();

    await expect(editor.locator('[aria-label="Document (selected)"]')).toBeVisible();
    await expect(editor.locator('[aria-label="Block"]')).toBeVisible();

    await editor.locator('[aria-label="Close settings"]').click();
    
    await expect(editor.locator('[aria-label="Document (selected)"]')).not.toBeVisible();
    await expect(editor.locator('[aria-label="Block"]')).not.toBeVisible();
});