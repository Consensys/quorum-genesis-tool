
import * as networkGen from "../../src/lib/networkGenerate";
import { TEST_QUORUM_CONFIG } from "./testConstants"

describe("Network Generation tests", () => {

  it("should create nodekeys", async () => {
    const f = await networkGen.generateNetworkConfig(TEST_QUORUM_CONFIG);
    expect(f).not.toBe(null);
  });

});

