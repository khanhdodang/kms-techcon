import Page from './page'

const defaultElements = {
  usernameTextInput: '#username',
  passwordTextInput: '#password',
  loginButton: '#bt_login',
  flashLabel: '#flash',
  loginForm: '#login'
}

export default class LoginPage extends Page {
  constructor(elements = {}) {
    const totalElements = {...defaultElements, ...elements}
    super(totalElements)
  }

  async login(username, password) {
    await this.client
      .setValue(this.elements.usernameTextInput, username)
      .setValue(this.elements.passwordTextInput, password)
      .click(this.elements.loginButton)
  }

  async getMessage() {
    const text = await this.client.getText('#flash')
    return text
  }

}
