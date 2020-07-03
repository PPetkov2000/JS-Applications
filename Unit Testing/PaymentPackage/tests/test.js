const expect = require("chai").expect;
const PaymentPackage = require("../app");
describe("Payment Package", function () {
  describe("constructor", function () {
    it("Can be instantiated with two parameters - a string name and number value", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(instance).to.have.property("name").equal("Consultation");
      expect(instance).to.have.property("value").equal(1000);
    });
    it("Cannot be instantiated with non-empty-string", function () {
      expect(() => new PaymentPackage("", 1)).to.throw(
        "Name must be a non-empty string"
      );
      expect(() => new PaymentPackage(1, 1)).to.throw(
        "Name must be a non-empty string"
      );
    });
    it("Cannot be instantiated with non-negative number", function () {
      expect(() => new PaymentPackage("Consultation", -1)).to.throw(
        "Value must be a non-negative number"
      );
      expect(() => new PaymentPackage("Consultation", "string")).to.throw(
        "Value must be a non-negative number"
      );
    });
  });
  describe("Accessor: name", function () {
    it("Get name", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(instance).to.have.property("name").equal("Consultation");
    });
    it("Set valid name", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      instance.name = "New name";
      expect(instance).to.have.property("name").equal("New name");
    });
    it("Set invalid name", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(() => (instance.name = "")).to.throw(
        "Name must be a non-empty string"
      );
      expect(() => (instance.name = 1)).to.throw(
        "Name must be a non-empty string"
      );
    });
  });
  describe("Accessor: value", function () {
    it("Get value", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(instance).to.have.property("value").equal(1000);
    });
    it("Set valid value", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      instance.value = 1500;
      expect(instance).to.have.property("value").equal(1500);
    });
    it("Set invalid value", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(() => (instance.value = "")).to.throw(
        "Value must be a non-negative number"
      );
      expect(() => (instance.value = -1)).to.throw(
        "Value must be a non-negative number"
      );
    });
  });
  describe("Accessor: VAT", function () {
    it("Get VAT", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(instance).to.have.property("VAT").equal(20);
    });
    it("Set valid VAT", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      instance.VAT = 30;
      expect(instance).to.have.property("VAT").equal(30);
    });
    it("Set invalid VAT", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(() => (instance.VAT = "")).to.throw(
        "VAT must be a non-negative number"
      );
      expect(() => (instance.VAT = -1)).to.throw(
        "VAT must be a non-negative number"
      );
    });
  });
  describe("Accessor: active", function () {
    it("Get active", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(instance).to.have.property("active").equal(true);
    });
    it("Set valid status", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      instance.active = false;
      expect(instance).to.have.property("active").equal(false);
    });
    it("Set invalid status", function () {
      const instance = new PaymentPackage("Consultation", 1000);
      expect(() => (instance.active = "")).to.throw(
        "Active status must be a boolean"
      );
      expect(() => (instance.active = 1)).to.throw(
        "Active status must be a boolean"
      );
    });
  });
  describe("toString()", function () {
    it("Test toString()", function () {
      const instance = new PaymentPackage("HR Services", 1500);
      expect(instance.toString()).to.equal(
        `Package: ${instance.name}\n- Value (excl. VAT): ${
          instance.value
        }\n- Value (VAT ${instance.VAT}%): ${
          instance.value * (1 + instance.VAT / 100)
        }`
      );
    });
    it("Test toString()", function () {
      const instance = new PaymentPackage("HR Services", 1500);
      instance.active = false;
      expect(instance.toString()).to.equal(
        `Package: ${instance.name} (inactive)\n- Value (excl. VAT): ${
          instance.value
        }\n- Value (VAT ${instance.VAT}%): ${
          instance.value * (1 + instance.VAT / 100)
        }`
      );
    });
    it("Test toString()", function () {
      const instance = new PaymentPackage("HR Services", 1500);
      instance.VAT = 0;
      expect(instance.toString()).to.equal(
        `Package: ${instance.name}\n- Value (excl. VAT): ${
          instance.value
        }\n- Value (VAT 0%): ${instance.value * (1 + instance.VAT / 100)}`
      );
    });
    it("Test toString()", function () {
      const instance = new PaymentPackage("HR Services", 0);
      instance.VAT = 0;
      expect(instance.toString()).to.equal(
        "Package: HR Services\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0"
      );
    });
  });
});
