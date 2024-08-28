const { test, expect, beforeEach, request } = require('@playwright/test');
const { describe } = require('@playwright/test');
import login from './helper';

describe('BlogList', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                login: 'newLogin',
                name: 'test login',
                password: '1234',
            }
        })

        await page.goto('/')
    })

    test('страница открывается', async ({ page }) => {
        await expect(await page.getByTestId('logButton')).toBeVisible()
    })

    test('можно залогиниться', async ({ page }) => {
        await login(page, 'newLogin', '1234')
        await expect(await page.getByText('test login logged in')).toBeVisible()

    })
    test('ошибка при неверных учётных данных', async ({ page }) => {
        await login(page, 'newLogin', '123')
        await expect(await page.getByText('wrong credentials')).toBeVisible()

    })
    describe('после авторизации', () => {
        beforeEach(async ({ page, request }) => {
            await login(page, 'newLogin', '1234')
        })

        test('можно создать запись ', async ({ page }) => {
            await page.getByTestId('logButton').click()
            await page.getByTestId('createBlogTitleInput').fill('new test Title')
            await page.getByTestId('createBlogAuthorInput').fill('new test Author')
            await page.getByTestId('createBlogUrlInput').fill('new test URL')
            await page.getByTestId('createBlogCreateBtn').click()
            await expect(page.getByText('new test Title')).toBeVisible()
        })


        describe('после создания записи', () => {
            beforeEach(async ({ page, request }) => {
                await page.getByTestId('logButton').click()
                await page.getByTestId('createBlogTitleInput').fill('new test Title')
                await page.getByTestId('createBlogAuthorInput').fill('new test Author')
                await page.getByTestId('createBlogUrlInput').fill('new test URL')
                await page.getByTestId('createBlogCreateBtn').click()
            })
            test('можно лайкнуть ', async ({ page }) => {
      
                await page.getByTestId('moreBtn').click()
                const initialLikes = await page.getByTestId('likesCount').innerText()
                await page.getByTestId('likeBtn').click()
                const updatedLikes = await page.getByTestId('likesCount').innerText()
                await expect(initialLikes).toBe(1) ;
            })
            test('можно удалить ', async ({ page }) => {
                let noteTitle = await page.getByTestId('createBlogTitleInput')
                await page.getByTestId('moreBtn').click()
                await page.getByTestId('deleteBtn').click()
                await expect(noteTitle).toBe(undefined) ;
            })

        })
    


    })


})