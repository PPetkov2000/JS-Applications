const expect = require("chai").expect;
const StringBuilder = require("../app");

describe("String Builder", function () {
  describe("constructor", function () {
    it("Can be instantiated with string", function () {
      expect(new StringBuilder("str")._stringArray.toString()).to.equal(
        "s,t,r"
      );
    });
    it("Can be instantiated with empty value", function () {
      expect(new StringBuilder()._stringArray.toString()).to.equal("");
    });
    it("Cannot be instantiated with non-string parameter", function () {
      expect(() => new StringBuilder(1)).to.throw("Argument must be string");
      expect(() => new StringBuilder(true)).to.throw("Argument must be string");
      expect(() => new StringBuilder([])).to.throw("Argument must be string");
      expect(() => new StringBuilder({})).to.throw("Argument must be string");
    });
  });
  describe("append", function () {
    it("Test length", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.append("b");
      expect(stringBuilder).to.have.property("_stringArray").with.lengthOf(2);
    });
    it("Test if added at the end", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.append("b");
      expect(stringBuilder._stringArray[1]).to.equal("b");
    });
    it("Non-string parameter => throw", function () {
      expect(() => new StringBuilder().append(1)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().append(true)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().append([])).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().append({})).to.throw(
        "Argument must be string"
      );
    });
  });
  describe("prepend", function () {
    it("Test length", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.prepend("b");
      expect(stringBuilder).to.have.property("_stringArray").with.lengthOf(2);
    });
    it("Test if added at the beginning", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.prepend("b");
      expect(stringBuilder._stringArray[0]).to.equal("b");
    });
    it("Non-string parameter => throw", function () {
      expect(() => new StringBuilder().prepend(1)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().prepend(true)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().prepend([])).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().prepend({})).to.throw(
        "Argument must be string"
      );
    });
  });
  describe("insertAt", function () {
    it("Test length", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.insertAt("bc", 1);
      expect(stringBuilder).to.have.property("_stringArray").with.lengthOf(3);
    });
    it("Test if the string is inserted at index", function () {
      const stringBuilder = new StringBuilder("a");
      stringBuilder.insertAt("bc", 1);
      expect(stringBuilder._stringArray[1]).to.equal("b");
    });
    it("Non-string parameter => throw", function () {
      expect(() => new StringBuilder().insertAt(1, 1)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().insertAt(true, 1)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().insertAt([], 1)).to.throw(
        "Argument must be string"
      );
      expect(() => new StringBuilder().insertAt({}, 1)).to.throw(
        "Argument must be string"
      );
    });
  });
  describe("remove", function () {
    it("Test length", function () {
      const stringBuilder = new StringBuilder("abc");
      stringBuilder.remove(1, 1);
      expect(stringBuilder).to.have.property("_stringArray").with.lengthOf(2);
    });
    it("Test result", function () {
      const stringBuilder = new StringBuilder("abc");
      stringBuilder.remove(1, 1);
      expect(stringBuilder.toString()).to.equal("ac");
    });
  });
  describe("toString", function () {
    it("Test if joined", function () {
      const stringBuilder = new StringBuilder("abc");
      expect(stringBuilder.toString()).to.equal("abc");
    });
  });
  describe("Full tests", function () {
    it("StringBuilder should exists", function () {
      expect(StringBuilder).to.exist;
    });
    it("StringBuilder type should be function", function () {
      expect(typeof StringBuilder).to.equal("function");
    });
    it("StringBuilder should have the correct function properties", function () {
      assert.isFunction(StringBuilder.prototype.append);
      assert.isFunction(StringBuilder.prototype.prepend);
      assert.isFunction(StringBuilder.prototype.insertAt);
      assert.isFunction(StringBuilder.prototype.remove);
      assert.isFunction(StringBuilder.prototype.toString);
    });
    it("Full test", function () {
      const stringBuilder = new StringBuilder("hello");
      stringBuilder.append(", there");
      stringBuilder.prepend("User, ");
      stringBuilder.insertAt("woop", 5);
      stringBuilder.remove(6, 3);
      expect(stringBuilder.toString()).to.equal("User,w hello, there");
    });
  });
});
