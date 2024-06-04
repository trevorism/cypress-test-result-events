# cypress-test-result-events
![Build](https://github.com/trevorism/cypress-test-result-events/actions/workflows/build.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/trevorism/cypress-test-result-events)
![GitHub language count](https://img.shields.io/github/languages/count/trevorism/cypress-test-result-events)
![GitHub top language](https://img.shields.io/github/languages/top/trevorism/cypress-test-result-events)
![npm](https://img.shields.io/npm/v/@trevorism/cypress-test-result-events)

Cypress plugin to send Trevorism testResult events.

## Usage
`cypress.config.js`
``` 
  ...
  e2e: {
    setupNodeEvents(on, config) {
      registerTrevorismEventSender({on});
    }
  },
  ...
```

### Development server
```
npm run dev
```