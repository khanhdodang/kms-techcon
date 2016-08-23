import LoginPage from '../pageobjects/login'
import {assert} from 'chai'
import BPromise from 'bluebird'
describe('Verify desktop application', () => {
  let loginPage

  before(async () => {
    loginPage = new LoginPage()
    await loginPage.startApplication()
  })

  after(async () => {
    await loginPage.stopApplication()
  })

  it('should deny access with wrong creds', async () => {
    await loginPage.login('foo', 'bar')
    const msg = await loginPage.getMessage()
    await BPromise.delay(3000)
    assert.include(msg, 'Your username or password is invalid!')
  })

  it('should allow access with correct creds', async() => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!')
    const msg = await loginPage.getMessage()
    await BPromise.delay(3000)
    assert.include(msg, 'You logged into a secure area!')
  })
})
