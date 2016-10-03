
/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import * as chai from "chai";
import { ILayer } from "../src/layer";
import { makeLayerXml } from "../src/make-response";

const should = chai.should();

describe("spike", () => {

  it("should equal 3", () => {
    let three = 3;
    three.should.equal(3);
  });

});

describe("make-layer-xml", () => {

  it("should work", () => {
    let layer = {
      Name: "Some layer",
      Title: "Some layer title"
    };
    let result = makeLayerXml(layer);
    console.log(result);
    //result.should.equal(3);
  });

});


