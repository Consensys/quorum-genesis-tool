
import * as fileHandler from "../../src/lib/fileHandler";
import { TEST_QUORUM_CONFIG } from "./testConstants";

describe("FileHandler tests", () => {

  it("should create a new output folder", () => {
    const path = './output/' + fileHandler.createTimestamp();
    const f: string = fileHandler.setupOutputFolder(path, TEST_QUORUM_CONFIG);
    expect(f).not.toBe(null);
  });

});

