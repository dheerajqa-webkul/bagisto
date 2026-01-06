import { test, expect } from '../../setup';

test.describe('exchange rate management', () => {
    test('create exchange rate', async ({ adminPage }) => {
  await adminPage.goto('admin/settings/exchange-rates');

  await adminPage.click('button.primary-button:visible');

  const select = adminPage.locator('select[name="target_currency"]');
  const options = await select.locator('option').all();

  const value = await select.evaluate((el: HTMLSelectElement) =>
  el.options[1]?.value ?? el.options[0].value
);

await select.selectOption(value);


  await adminPage.fill('input[name="rate"]', (Math.random() * 500).toFixed(2));

  // ✅ Click Save instead of Enter
  await adminPage.getByRole('button', { name: 'Save Exchange Rate' }).click();

  // ✅ Assert robustly
 await expect(adminPage.getByText('Exchange Rate Created')).toBeVisible();
});


test('edit exchange rate', async ({ adminPage }) => {
        await adminPage.goto('admin/settings/exchange-rates');

       await expect(adminPage.locator('span.icon-edit').first()).toBeVisible();


        const iconEdit = adminPage.locator('span.icon-edit');

        await iconEdit.first().click();

        await adminPage.click('select[name="target_currency"]');

        const select = await adminPage.$('select[name="target_currency"]');

        const options = await select.$$eval('option', (options) => {
            return options.map(option => option.value);
        });

        if (options.length > 1) {
            const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

            await select.selectOption(options[randomIndex]);
        } else {
            await select.selectOption(options[0]);
        }

        await adminPage.fill('input[name="rate"]', (Math.random() * 500).toString());
        await adminPage.getByRole('button', { name: 'Save Exchange Rate' }).click();

        await expect(adminPage.getByText('Exchange Rate Updated')).toBeVisible();
    });

 test('delete exchange rate', async ({ adminPage }) => {
        await adminPage.goto('admin/settings/exchange-rates');

     const deleteIcon = adminPage.locator('span.icon-delete').first();
     await deleteIcon.waitFor({ state: 'visible' });
     await deleteIcon.click();


    await adminPage.click('button.transparent-button + button.primary-button:visible');

    await expect(adminPage.getByText('Exchange Rate Deleted')).toBeVisible();
    });
});
