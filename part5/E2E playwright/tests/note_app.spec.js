const { test, expect, beforeEach } = require('@playwright/test');
const { describe } = require('node:test');



describe('Note App', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                login: 'newLogin',
                name: 'Test',
                password: '1234'
            }
        })
        await page.goto('http://localhost:5173')
    })
    test('пользователь может авторизоваться', async ({ page }) => {
        await page.getByRole('button', { name: 'log' }).click();
        await page.getByTestId('login').fill('newLogin');
        await page.getByTestId('password').fill('1234');
        await page.getByRole('button', { name: 'login' }).click();
        await expect(page.getByText('newLogin logged-in')).toBeVisible()
    })

    //после тесты после авторизации
    describe('тесты после авторизации', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'log' }).click();
            await page.getByTestId('login').fill('newLogin');
            await page.getByTestId('password').fill('1234');
            await page.getByRole('button', { name: 'login' }).click();
        })
        test('можно создать новую запись использую интерфейс', async ({ page }) => {
            await page.getByTestId('newNote').click()
            await page.getByTestId('addNoteInput').fill('new test note from playwright');
            await page.getByTestId('addNoteBtn').click();
            await expect(page.getByText('new test note from playwright')).toBeVisible()
        })




    })

})

