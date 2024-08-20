const { test, expect, beforeEach } = require('@playwright/test');
const { describe } = require('node:test');



describe('Note App', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })


    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'log' }).click();
        await page.getByTestId('login').fill('newLogin');
        await page.getByTestId('password').fill('1234');
        await page.getByRole('button', { name: 'login' }).click();
        await expect(page.getByText('newLogin logged-in')).toBeVisible()
    })

    //после тесты после логина
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'log' }).click();
            await page.getByTestId('login').fill('newLogin');
            await page.getByTestId('password').fill('1234');
            await page.getByRole('button', { name: 'login' }).click();
        })
        test('front page can be opened', async ({ page }) => {
            const heading = await page.getByRole('heading', { name: 'Notes' })
            await expect(heading).toBeVisible()
            await expect(page.getByText('hello token')).toBeVisible()
        })
        test('new blog can be created', async ({ page }) => {

            await page.getByTestId('newNote').click()
            await page.getByTestId('addNoteInput').fill('new test note from playwright');
            await page.getByTestId('addNoteBtn').click();
            await expect(page.getByText('new test note from playwright')).toBeVisible()
        })


    })

})

