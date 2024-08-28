const login = async (page,login,password) => {
    await page.getByTestId('logButton').click()
    await page.getByTestId('loginInput').fill(login)
    await page.getByTestId('passwordInput').fill(password)
    await page.getByTestId('loginBtn').click()

}

export default login