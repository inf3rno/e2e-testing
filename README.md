# e2e-testing
End to end testing with client side javascript.

## installation

```
npm install e2e-testing --save-dev
```

## API documentation

You can find the [**API documentation on this wiki page**](https://github.com/inf3rno/e2e-testing/wiki/documentation).

The recommended way to use the library is Karma with the Chrome launcher with your favourite testing framework.

A simple test with Mocha and Chai.expect looks like this:

```js
const expect = require("chai").expect;
const e2e = require("e2e-testing");

describe("google.com", function () {

	let window, navigator;

	before(function () {
		({window, navigator} = e2e.openWindow());
	});

	describe("the main page", function () {

		it("should contain a search button with Google in the legend on the main page", async function () {
			await navigator.load("https://www.google.com");
			const searchButtonLegend = window.document.forms["f"]["btnK"].value;
			const isGoogleInTheLegend = searchButtonLegend.indexOf("Google") != -1;
			expect(isGoogleInTheLegend).to.equal(true);
		});

	});

	after(function () {
		e2e.closeWindow(window);
	});

});
```

## support

Currently the project goals with a single contributor, so we cannot support infinite number of libraries.
If you need support for a library, then [create an issue](https://github.com/inf3rno/e2e-testing/issues/new), and we will discuss it there.

### package manager support

We support currently npm only.

### test launcher and module bundler support

The library supports Karma and Browserify only.

### browser support

The library supports **Chrome with Karma** and Opera 55+ manually.

 - It requires a specific implementation of page loading in child windows and defer functions.
Chrome, new Opera and Firefox meet with this constraint, while IE, Edge, PhantomJS and Safari don't.
 - It requires disabled web security to access the content of the cross-origin child windows it opens.
 Currently Chromium based browsers are the only ones which have a command line argument to turn off web security,
 and allow cross-frame, cross-origin access. Without that argument the only option to disable the security and run the tests manually.
 Chrome is supported. Opera is not supported, because the [Karma Opera launcher is outdated](https://github.com/karma-runner/karma-opera-launcher/issues/48),
 but you can run your tests on Opera manually.
 [Firefox developers still don't want to add the disabled web security feature](https://bugzilla.mozilla.org/show_bug.cgi?id=1039678),
 so for now we don't support Firefox.

### testing framework and assertion library support

You can use any testing framework and assertion library. The only constraint here, that it should support asynchronous testing.

## contribution

Any contribution is welcome, however we have a few rules:
 - every commit must contain at least a single new test (or a fixed test) if it changes the library code
 - every commit must pass the tests to keep the master clean, so you need to squash the commits if you made a mistake
 - using ES6 features, like classes, arrow functions, destructuring is expected
 - keep the code format (WebStorm default), and the same coding style (e.g. double quotes by strings)