# Test Framework

This Automation testing framework primarily uses Jest as test runner and below are the support modules:

  - superAgent - http lib
  - jest-html-reporter - to create html report

# Features

  - Configurable - just need to modify ".env" file to point to any environment. Either local or cloud
  - Test Data driven - As the scenarios are test data driven. To test more inputs, just need to add data "testData"


### Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
```
## Secrets

Add your secrets of coop such as user ID  and client_secret to .env file


### Code Quality

To check the code written follows javascript and es6 convention

```sh
$ yarn lint
```


### Running Test

```sh
$ yarn test
```

### Report
Once test is run, the result will be reported in console and also as HTML reporter in "report" folder

