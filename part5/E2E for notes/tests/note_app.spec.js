const { test, expect, beforeEach } = require('@playwright/test');
const { describe } = require('@playwright/test');
import { loginWith, createNote } from './helper';



describe('Note App', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                login: 'newLogin',
                name: 'Test',
                password: '1234'
            }
        })
        await page.goto('/')
    })



    test('пользователь может авторизоваться', async ({ page }) => {

        await loginWith(page, 'newLogin', '1234')
        await expect(page.getByText('newLogin logged-in')).toBeVisible()
    })

    describe('при вводе неверных логина пароля выводиться попап ошибки', () => {

        test('ошибка в логине', async ({ page }) => {
            await loginWith(page, 'test red popup', '1234')
            const errorDiv = await page.locator('.popup-red')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(page.getByText('test red popup logged in')).not.toBeVisible()
        })
        test('ошибка в пароле', async ({ page }) => {
            await loginWith(page, 'newLogin', 'popup-red')
            const errorDiv = await page.locator('.popup-red')
            await expect(errorDiv).toContainText('Wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
            await expect(page.getByText('newLogin')).not.toBeVisible()
        })

    })

    //после тесты после авторизации
    describe('тесты после авторизации', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'newLogin', '1234')
        })
        test('приложение открываеться ', async ({ page }) => {
            await expect(page.getByTestId('heading')).toBeVisible()
        })


        test('можно создать новую запись используя интерфейс', async ({ page }) => {
            await createNote(page, 'new test note from playwright')
            await expect(page.getByText('new test note from playwright')).toBeVisible()
        })



        describe('тесты после создания заметки', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'new test note')
                
            })

            test('можно изменить приоритет заметки', async ({ page }) => {
                await page.getByTestId('toggle-importance').click()

                await expect(page.getByText('make not important')).toBeVisible()
            })
            test('после создания выводится попап успешного создания заметки', async ({ page }) => {

                await expect(page.getByText('note was created')).toBeVisible()
            })

        })

    })








})








