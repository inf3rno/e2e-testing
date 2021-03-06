const expect = require("chai").expect;
const e2e = require("./e2e");
const server = require("./server/root");
const navigator = e2e.openWindow();

describe("server side redirection", function () {

    it("should not trigger reload by server side redirection", async function () {
        const redirectedPage = await navigator.load(`${server}/redirect`);
        expect(redirectedPage.URL).to.equal(`${server}/`);
    });

    after(function () {
        navigator.closeWindow();
    });
});