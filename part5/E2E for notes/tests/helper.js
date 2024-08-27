const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'log' }).click()
    await page.getByTestId('login').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
    await page.getByTestId('newNote').click()
    await page.getByTestId('addNoteInput').fill('new test note from playwright');
    await page.getByTestId('addNoteBtn').click();
}

export { loginWith, createNote }