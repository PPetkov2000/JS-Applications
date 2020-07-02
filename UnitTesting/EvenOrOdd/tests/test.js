const expect = require("chai").expect;
const { isOddOrEven } = require("../app");

describe("Check for a string length: EVEN or ODD", function () {
  it("non string parameter returns undefined", function () {
    expect(isOddOrEven(1)).to.equal(undefined, "Invalid data!");
    expect(isOddOrEven(true)).to.equal(undefined, "Invalid data!");
    expect(isOddOrEven([])).to.equal(undefined, "Invalid data!");
    expect(isOddOrEven({})).to.equal(undefined, "Invalid data!");
  });
  it("Test should return even", function () {
    expect(isOddOrEven("Test")).to.equal("even");
  });
  it("Hey should return odd", function () {
    expect(isOddOrEven("Hey")).to.equal("odd");
  });
});
