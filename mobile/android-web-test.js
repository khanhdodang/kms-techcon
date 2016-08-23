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
      deviceName: 'Nexus 5',
      browserName: 'Browser',
      platformName: 'Android'
    }

    const driver = wd.promiseChainRemote(serverConfig)
    driver.on('status', function (info) {console.log(info.cyan)})
    driver.on('command', function (meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', function (meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })
    
    driver
      .init(desiredCaps)
      .get('https://www.google.com')
      .waitForElementByName('q').sendKeys('Kobiton.com')
      .waitForElementByName('btnG').click()
      .sleep(3000)
      .title().then(function(text) { assert.include(text, 'Kobiton.com') })
      .quit()
      .done(cb)
  })
})
