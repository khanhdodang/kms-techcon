describe("iOS App simple", function() {

  it("should compute the sum", function(cb) {
    const wd = require('wd')
    const assert = require('chai').assert
    const _ = require('underscore')
    const colors = require('colors')

    const serverConfig = {
      host: 'localhost',
      port: 4723
    }

    const desiredCaps = {
        browserName: '',
        platformName: 'iOS',
        platformVersion: '9.3',
        deviceName: 'iPhone 6s',
        bundleId: 'io.appium.TestApp',
        app: 'http://appium.github.io/appium/assets/TestApp7.1.app.zip' // Need to re-sign app from External Developer
    }

    const x = _.random(1, 10)
    const y = _.random(1, 10)
    const sum = x + y

    const driver = wd.promiseChainRemote(serverConfig)
    driver.on('status', function (info) {console.log(info.cyan)})
    driver.on('command', function (meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', function (meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })
    
    driver.init(desiredCaps)
      .elementById('IntegerA').type(x)
      .elementById('IntegerB').type(y)
      .elementById('Done').click()
      .elementById('ComputeSumButton').click()
      .sleep(1000)
      .elementById('Answer')
      .text().then(function(text) { assert.include(text, sum) })
      .quit()
      .done(cb)
  })
});
