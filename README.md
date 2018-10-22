# e2e-testing

[![Build Status](https://travis-ci.org/inf3rno/e2e-testing.svg?branch=master)](https://travis-ci.org/inf3rno/e2e-testing)

End to end testing with client side javascript.

## example e2e test with the low-level API

A simple test with NPM, Mocha and Chai.expect looks like this:

```js
const expect = require("chai").expect;
const e2e = require("e2e-testing");
const navigator = e2e.openWindow({
    silent: true
});

describe("testing a random page", function () {

    it("should be able to search on google.com", async function () {
        const searchPage = await navigator.load("https://www.google.com");
        const searchInput = searchPage.querySelector("input[type=text]");
        expect(searchInput != null).to.equal(true);
        searchInput.value = "rembrandt van rijn";
        const searchForm = searchInput.closest("form");
        const resultsPage = await navigator.submit(searchForm);
        expect(resultsPage.documentElement.innerHTML.indexOf("Rembrandt - Wikipedia") !== -1).to.equal(true);
    });

    after(function () {
        navigator.closeWindow();
    });
});
```


## installation with NPM

```sh
npm install e2e-testing --save-dev
```

## usage with Karma and Chrome

The recommended way to use this library with Karma and a Chrome based custom launcher with disabled web security:
```js
customLaunchers: {
    "ch": {
        "base": "Chrome",
        "flags": ["--disable-web-security"]
    }
},
```

You can try headless Chrome too.

### starting the HTTP server with the tests automatically

If you want to start your server before running the script, you have to use a bash script:
```sh
#!/bin/bash

node test/server/index.js & karma start karma.conf.js
kill $!
```

The starting of the Karma server and the opening of the browser windows usually takes a lot more time than starting a HTTP server.
Otherwise this bash script won't work, and you need to wait for the start of the HTTP server before running the tests.

On Windows environments the `&` operator does not work properly, so you need to use git bash to run the upper script.

In NPM scripts you can try using parallelization libraries, like [concurrently](https://github.com/kimmobrunfeldt/concurrently) or use `bash test.sh`.

In JetBrains IDEs (or probably other IDEs too) you need to set the shell path in `File/Settings/Tool/Terminal` to git bash if you want it to report to the terminal of the IDE.

## usage with Travis

You need to add the following to the Travis YML file:
```yml
dist: trusty
addons:
  chrome: stable
before_install:
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start
  - sleep 5
```

Be aware that you need to add the `--no-sandbox` flag in your Karma config if you want to run Chrome in a container.

Another option to use headless Chrome without Xvfb.

## API documentation

You can find the [**API documentation on this wiki page**](https://github.com/inf3rno/e2e-testing/wiki/documentation).

## support of different frameworks and libraries

Currently the project supports NPM + Karma + Chrome. If you need support for any kind of library, then [create an issue](https://github.com/inf3rno/e2e-testing/issues/new), and we will discuss it there.

Supported libraries, frameworks, etc.:
- package manager: NPM
- test launcher and module bundler: Karma and Browserify
- browser: Chrome only (further details about why Chrome only [in the wiki](https://github.com/inf3rno/e2e-testing/wiki/browser-support-and-browser-features))
- testing and assertion library: anything which supports asynchronous testing, e.g. Mocha + Chai

## contribution

Any contribution is welcome, however we have a few rules:
 - every pull request that touches the library code must contain a new test or a test change as well
 - every commit must pass the tests to keep the master green, so you need to squash the commits if you made a mistake
 - using ES6 features, like classes, arrow functions, destructuring is expected
 - keep the code format (WebStorm default), and the same coding style (e.g. double quotes by strings)

Currently we have only a single master branch, so you need to fork the code and
[send the pull request from the fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
if you want to contribute. This can change later if other contributors join.

## license

MIT