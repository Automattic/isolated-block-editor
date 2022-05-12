import { test, expect } from '@playwright/test';

test('Toolbar settings botton', async ({ page }) => {
    await page.goto('/?path=/story/isolated-block-editor--toolbar-settings');
    const editor = page.frameLocator('#storybook-preview-iframe');
     
    await editor.locator('role=button[name="Settings"]').click();

    await expect(editor.locator('role=button[name="Document (selected)"]')).toBeVisible();
    await expect(editor.locator('role=button[name="Block"]')).toBeVisible();

    await editor.locator('role=button[name="Close settings"]').click();
    
    await expect(editor.locator('role=button[name="Document (selected)"]')).not.toBeVisible();
    await expect(editor.locator('role=button[name="Block"]')).not.toBeVisible();
});