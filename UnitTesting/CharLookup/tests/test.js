const expect = require("chai").expect;
const { lookupChar } = require("../app");

describe("LookupChar", function () {
  it("Valid data", function () {
    expect(lookupChar("string", 1)).to.equal("t");
  });
  it("Invalid first parameter => not a string", function () {
    expect(lookupChar(1, 1)).to.equal(undefined);
  });
  it("Invalid second parameter => not a number", function () {
    expect(lookupChar("string", "1")).to.equal(undefined);
  });
  it("Floating point numbers => 3.14 return undefined", function () {
    expect(lookupChar("string", 3.14)).to.equal(undefined);
  });
  it("Incorrect index", function () {
    expect(lookupChar("string", -1)).to.equal("Incorrect index");
    expect(lookupChar("string", 6)).to.equal("Incorrect index");
  });
});
