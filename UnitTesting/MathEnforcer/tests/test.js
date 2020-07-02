const expect = require("chai").expect;
const { mathEnforcer } = require("../app");

describe("Math Enforcer", function () {
  describe("addFive", function () {
    it("If the parameter is not a number => undefined", function () {
      expect(mathEnforcer.addFive("")).to.equal(undefined);
      expect(mathEnforcer.addFive([])).to.equal(undefined);
      expect(mathEnforcer.addFive({})).to.equal(undefined);
      expect(mathEnforcer.addFive(true)).to.equal(undefined);
    });
    it("Valid parameter", function () {
      expect(mathEnforcer.addFive(1)).to.equal(6);
      expect(mathEnforcer.addFive(-1)).to.equal(4);
      expect(mathEnforcer.addFive(1.5)).to.equal(6.5);
    });
  });
  describe("subtractTen", function () {
    it("If the parameter is not a number => undefined", function () {
      expect(mathEnforcer.subtractTen("")).to.equal(undefined);
      expect(mathEnforcer.subtractTen([])).to.equal(undefined);
      expect(mathEnforcer.subtractTen({})).to.equal(undefined);
      expect(mathEnforcer.subtractTen(true)).to.equal(undefined);
    });
    it("Valid parameter", function () {
      expect(mathEnforcer.subtractTen(11)).to.equal(1);
      expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
      expect(mathEnforcer.subtractTen(11.5)).to.equal(1.5);
    });
  });
  describe("sum", function () {
    it("If the parameters are not numbers => undefined", function () {
      expect(mathEnforcer.sum("", 1)).to.equal(undefined);
      expect(mathEnforcer.sum([], 1)).to.equal(undefined);
      expect(mathEnforcer.sum({}, 1)).to.equal(undefined);
      expect(mathEnforcer.sum(true, 1)).to.equal(undefined);
      expect(mathEnforcer.sum(1, "")).to.equal(undefined);
      expect(mathEnforcer.sum(1, [])).to.equal(undefined);
      expect(mathEnforcer.sum(1, {})).to.equal(undefined);
      expect(mathEnforcer.sum(1, true)).to.equal(undefined);
    });
    it("Valid parameters", function () {
      expect(mathEnforcer.sum(1, 1)).to.equal(2);
      expect(mathEnforcer.sum(-1, -1)).to.equal(-2);
      expect(mathEnforcer.sum(1.1, 1)).to.equal(2.1);
      expect(mathEnforcer.sum(1, 1.1)).to.equal(2.1);
      expect(mathEnforcer.sum(1.1, 1.1)).to.equal(2.2);
    });
  });
});
