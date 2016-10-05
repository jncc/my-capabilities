/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { expect } from "chai";
import { makeLayerXml } from "../src/capabilities";

describe("spike", () => {

  it("should equal 3", () => {
    let three = 3;
    expect(three).to.equal(3);
  });

});

describe("make-layer-xml", () => {

  it("should work", () => {
    let layer = {
      Name: "Some layer",
      Title: "Some layer title",
      Abstract: null
    };
    let result = makeLayerXml(layer);
    expect(result).to.have.string("<Name>Some layer</Name>")
    console.log(result);
  });

});
