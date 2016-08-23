import {Application} from 'spectron'

export const desktopApp = initDesktop()

function initDesktop(options = {}) {
  options.path = '/Applications/KMSTechCon.app/Contents/MacOS/KMSTechCon'
  options.startTimeout = 30000
  options.waitTimeout = 60000
  return new Application(options)
}

export default class Page {
  constructor(elements = {}) {
    this._elements = {...elements}
  }

  get elements() {
    return this._elements
  }

  get client() {
    return desktopApp.client
  }

  get webContents() {
    return desktopApp.webContents
  }

  async startApplication() {
    await desktopApp.start()
    await this.client.waitUntilWindowLoaded()
  }

  async stopApplication() {
    if (!desktopApp || !desktopApp.isRunning()) return
    await desktopApp.stop()
  }

  isAppRunning() {
    return desktopApp.isRunning()
  }
}
