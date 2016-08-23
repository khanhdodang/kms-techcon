describe('Google Search', function() {
  
  it('should search Google', function(cb) {
    const wd = require('wd')
    const assert = require('chai').assert
    const colors = require('colors')

    const serverConfig = {
      host: 'localhost',
      port: 4723
    }

    const desiredCaps = {
      deviceName: 'iPhone 6',
      browserName: 'Safari',
      platformName: 'iOS'
    }

    const browser = wd.promiseChainRemote(serverConfig)
    browser.on('status', function (info) {console.log(info.cyan)})
    browser.on('command', function (meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    browser.on('http', function (meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })

    browser
      .init(desiredCaps)
      .get('https://www.google.com')
      .waitForElementById('lst-ib').sendKeys('Kobiton.com')
      .waitForElementById('tsbb').click()
      .sleep(3000)
      .title().then(function(text) { assert.include(text, 'Kobiton.com') })
      .quit()
      .done(cb)
  })
})
