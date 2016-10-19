/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { expect } from "chai";
import { makeLayerXml } from "../app.server/capabilities";

describe("spike", () => {

  it("3 should equal 3", () => {
    let three = 3;
    expect(three).to.equal(3);
  });

  it("4 should equal 4", () => {
    let four = 4;
    expect(four).to.equal(4);
  });
});

describe("make-layer-xml", () => {

  it("should work", () => {
    let layer = {
      Name: "Some layer",
      Title: "Some layer title",
      Abstract: null,
    };
    let result = makeLayerXml(layer);
    expect(result).to.have.string("<Name>Some layer</Name>")
    // console.log(result);
  });
});
