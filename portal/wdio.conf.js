exports.config = {
    specs: [
        './portal/specs/*.spec.js'
    ],
    maxInstances: 2,
    capabilities: [{
        maxInstances: 1,
        browserName: 'firefox'
    }
    // ,
    // {
    //     maxInstances: 1,
    //     browserName: 'chrome'
    // }
  ],
    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,
    screenshotPath: './errorScreenshots/',
    baseUrl: 'http://the-internet.herokuapp.com',
    waitforTimeout: 1000,
    connectionRetryTimeout: 9000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['dot'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
