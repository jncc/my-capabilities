
/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import { Greeter } from "../src/greeter";
import * as chai from "chai";

const should = chai.should();

describe("spike", () => {
  it("should equal 3", () => {
    let three = 3;
    three.should.equal(3);
  });
});
