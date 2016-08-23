describe('Android App sample', function() {

  it('should navigate on APIDemos app', function(cb) {
    const wd = require('wd')
    const assert = require('chai').assert
    const colors = require('colors')

    const serverConfig = {
      host: 'localhost',
      port: 4723
    }

    const desiredCaps = {
      browserName: '',
      deviceName: 'Nexus 5',
      platformName: 'Android',
      app: 'http://appium.github.io/appium/assets/ApiDemos-debug.apk',
      appPackage: 'io.appium.android.apis',
      appActivity: '.ApiDemos'
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
      .elementByClassName("android.widget.TextView")
      .text().then(function(text) {assert.equal(text, 'API Demos')})
      .elementById('App').click()
      .elementById("Action Bar")
      .text().then(function(text) {assert.equal(text, 'Action Bar')})
      .elementById("Action Bar").click()
      .elementById("Action Bar Tabs")
      .text().then(function(text) {assert.equal(text, 'Action Bar Tabs')})
      .quit()
      .done(cb)
  })
})
