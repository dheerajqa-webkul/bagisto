import { test, expect } from "../../../setup";

import {
    generateDescription,
    generateRandomNumericString,
    getImageFile,
} from "../../../utils/faker";

test.describe("product configuration", () => {
    test.beforeEach(async ({ adminPage }) => {
        /**
         * Navigate to the configuration page.
         */
        await adminPage.goto("admin/configuration/catalog/products");
    });

    test("should update the compare and image search", async ({
        adminPage,
    }) => {
        await adminPage.click(
            'label[for="catalog[products][settings][compare_option]"]'
        );
        await adminPage.click(
            'label[for="catalog[products][settings][image_search]"]'
        );

        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();

         await adminPage.click(
            'label[for="catalog[products][settings][compare_option]"]'
        );
        await adminPage.click(
            'label[for="catalog[products][settings][image_search]"]'
        );

        await adminPage.click('button[type="submit"].primary-button:visible');
    });

    /**
     * Update the product view page configuration.
     */
    test("should update the product view page configuration", async ({
        adminPage,
    }) => {
        await adminPage
            .locator(
                'input[name="catalog[products][product_view_page][no_of_related_products]"]'
            )
            .fill(generateRandomNumericString(2));
        await adminPage
            .locator(
                'input[name="catalog[products][product_view_page][no_of_up_sells_products]"]'
            )
            .fill(generateRandomNumericString(2));
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
         await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the cart view page configuration", async ({
        adminPage,
    }) => {
        await adminPage
            .locator(
                'input[name="catalog[products][cart_view_page][no_of_cross_sells_products]"]'
            )
            .fill(generateRandomNumericString(2));
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the store front configuration", async ({
        adminPage,
    }) => {
        await adminPage.selectOption(
            'select[name="catalog[products][storefront][mode]"]',
            "grid"
        );
        const defaultListMode = adminPage.locator(
            'select[name="catalog[products][storefront][mode]"]'
        );
        await expect(defaultListMode).toHaveValue("grid");

        await adminPage
            .locator(
                'input[name="catalog[products][storefront][products_per_page]"]'
            )
            .fill(generateRandomNumericString(2));

        await adminPage.selectOption(
            'select[name="catalog[products][storefront][sort_by]"]',
            "name-asc"
        );
        const sortBy = adminPage.locator(
            'select[name="catalog[products][storefront][sort_by]"]'
        );
        await expect(sortBy).toHaveValue("name-asc");

        await adminPage.click(
            'label[for="catalog[products][storefront][buy_now_button_display]"]'
        );

        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();

         await adminPage.click(
            'label[for="catalog[products][storefront][buy_now_button_display]"]'
        );

        await adminPage.click('button[type="submit"].primary-button:visible');

    });

    test("should update the small image size and placeholder", async ({
        adminPage,
    }) => {
        const widthLocator = adminPage.locator(
            'input[name="catalog[products][cache_small_image][width]"]'
        );
        const heightLocator = adminPage.locator(
            'input[name="catalog[products][cache_small_image][height]"]'
        );

        // Save original values to revert later
        const originalWidth = await widthLocator.inputValue();
        const originalHeight = await heightLocator.inputValue();

        await widthLocator.fill(generateRandomNumericString(3));
        await heightLocator.fill(generateRandomNumericString(3));

        const [fileChooser] = await Promise.all([
            adminPage.waitForEvent("filechooser"),
            adminPage.click('label:has-text("Small Image Placeholder")'),
        ]);

        await fileChooser.setFiles(getImageFile());
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Delete the uploaded placeholder.
         */
        await adminPage
            .locator(
                '[id="catalog\\[products\\]\\[cache_small_image\\]\\[url\\]\\[delete\\]"]'
            )
            .nth(1)
            .click();
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();

        // Revert numeric entries back to original and save
        await widthLocator.fill(originalWidth);
        await heightLocator.fill(originalHeight);
        await adminPage.click('button[type="submit"].primary-button:visible');
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the medium image size and placeholder", async ({
        adminPage,
    }) => {
        const widthLocator = adminPage.locator(
            'input[name="catalog[products][cache_medium_image][width]"]'
        );
        const heightLocator = adminPage.locator(
            'input[name="catalog[products][cache_medium_image][height]"]'
        );

        // Save original values to revert later
        const originalWidth = await widthLocator.inputValue();
        const originalHeight = await heightLocator.inputValue();

        await widthLocator.fill(generateRandomNumericString(3));
        await heightLocator.fill(generateRandomNumericString(3));

        const [fileChooser] = await Promise.all([
            adminPage.waitForEvent("filechooser"),
            adminPage.click('label:has-text("Medium Image Placeholder")'),
        ]);

        await fileChooser.setFiles(getImageFile());
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Delete the uploaded placeholder.
         */
        await adminPage
            .locator(
                '[id="catalog\\[products\\]\\[cache_medium_image\\]\\[url\\]\\[delete\\]"]'
            )
            .nth(1)
            .click();
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();

        // Revert numeric entries back to original and save
        await widthLocator.fill(originalWidth);
        await heightLocator.fill(originalHeight);
        await adminPage.click('button[type="submit"].primary-button:visible');
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the large image size and placeholder", async ({
        adminPage,
    }) => {
        const widthLocator = adminPage.locator(
            'input[name="catalog[products][cache_large_image][width]"]'
        );
        const heightLocator = adminPage.locator(
            'input[name="catalog[products][cache_large_image][height]"]'
        );

        /**
         * Save original values to revert later
         */ 
        const originalWidth = await widthLocator.inputValue();
        const originalHeight = await heightLocator.inputValue();

        await widthLocator.fill(generateRandomNumericString(3));
        await heightLocator.fill(generateRandomNumericString(3));

        const [fileChooser] = await Promise.all([
            adminPage.waitForEvent("filechooser"),
            adminPage.click('label:has-text("Large Image Placeholder")'),
        ]);

        await fileChooser.setFiles(getImageFile());
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Delete the uploaded placeholder.
         */
        await adminPage
            .locator(
                '[id="catalog\\[products\\]\\[cache_large_image\\]\\[url\\]\\[delete\\]"]'
            )
            .nth(1)
            .click();
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();

        // Revert numeric entries back to original and save
        await widthLocator.fill(originalWidth);
        await heightLocator.fill(originalHeight);
        await adminPage.click('button[type="submit"].primary-button:visible');
        await expect(adminPage.locator('#app p', { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the review configuration", async ({ adminPage }) => {
        await adminPage.click(
            'label[for="catalog[products][review][guest_review]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][review][customer_review]"]'
        );

        await adminPage.selectOption(
            'select[name="catalog[products][review][summary]"]',
            "star_counts"
        );
        const searchEngine = adminPage.locator(
            'select[name="catalog[products][review][summary]"]'
        );
        await expect(searchEngine).toHaveValue("star_counts");

        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();
    });

    test("should update the allowed image and file upload size", async ({
        adminPage,
    }) => {
        const imageSizeLocator = adminPage.locator(
            'input[name="catalog[products][attribute][image_attribute_upload_size]"]'
        );
        const fileSizeLocator = adminPage.locator(
            'input[name="catalog[products][attribute][file_attribute_upload_size]"]'
        );

        // Save original values to revert later
        const originalImageSize = await imageSizeLocator.inputValue();
        const originalFileSize = await fileSizeLocator.inputValue();

        // Apply temporary changes
        await imageSizeLocator.fill(generateRandomNumericString(3));
        await fileSizeLocator.fill(generateRandomNumericString(3));
        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(
            adminPage.locator("#app p", { hasText: "Configuration saved successfully" })
        ).toBeVisible();

        // Revert numeric entries back to original and save
        await imageSizeLocator.fill(originalImageSize);
        await fileSizeLocator.fill(originalFileSize);
        await adminPage.click('button[type="submit"].primary-button:visible');
        await expect(
            adminPage.locator("#app p", { hasText: "Configuration saved successfully" })
        ).toBeVisible();
    });

    test("should update social share configuration", async ({ adminPage }) => {
        await adminPage.click(
            'label[for="catalog[products][social_share][enabled]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][facebook]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][twitter]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][pinterest]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][whatsapp]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][linkedin]"]'
        );

        await adminPage.click(
            'label[for="catalog[products][social_share][email]"]'
        );

        await adminPage
            .locator(
                'input[name="catalog[products][social_share][share_message]"]'
            )
            .fill(generateDescription());

        await adminPage.click('button[type="submit"].primary-button:visible');

        /**
         * Verify the change is saved.
         */
        await expect(adminPage.locator('#app p' , { hasText: 'Configuration saved successfully' })).toBeVisible();
    });
});
