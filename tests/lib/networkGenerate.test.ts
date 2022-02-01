
import * as networkGen from "../../src/lib/networkGenerate";
import { Consensus } from "../../src/types/consensus";
import { TEST_QUORUM_CONFIG } from "./testConstants";

describe("Network Generation tests", () => {

  it("should create artifacts for QBFT", async () => {
    const f = await networkGen.generateNetworkConfig(TEST_QUORUM_CONFIG);
    expect(f).not.toBe(null);
  });

  it("should create artifacts for IBFT", async () => {
    const ibftConfig = TEST_QUORUM_CONFIG;
    ibftConfig.consensus = Consensus.ibft;
    const f = await networkGen.generateNetworkConfig(ibftConfig);
    expect(f).not.toBe(null);
  });

  it("should create artifacts for IBFT2", async () => {
    const ibft2Config = TEST_QUORUM_CONFIG;
    ibft2Config.consensus = Consensus.ibft2;
    const f = await networkGen.generateNetworkConfig(ibft2Config);
    expect(f).not.toBe(null);
  });

  it("should create artifacts for clique", async () => {
    const cliqueConfig = TEST_QUORUM_CONFIG;
    cliqueConfig.consensus = Consensus.clique;
    const f = await networkGen.generateNetworkConfig(cliqueConfig);
    expect(f).not.toBe(null);
  });

  it("should create artifacts for raft", async () => {
    const raftConfig = TEST_QUORUM_CONFIG;
    raftConfig.consensus = Consensus.raft;
    const f = await networkGen.generateNetworkConfig(raftConfig);
    expect(f).not.toBe(null);
  });

});

