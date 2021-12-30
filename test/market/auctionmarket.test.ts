import chai, { expect } from "chai";
import asPromised from "chai-as-promised";
// @ts-ignore
import { ethers } from "hardhat";
import { RoniaMarket } from "../../typechain-types";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber, Contract, Signer } from "ethers";
const { deployWETH } = require("../utils");

chai.use(asPromised);

describe("RoniaMarket", () => {
  let weth: Contract;
  let accounts: Array<Signer>;
  let marketAccount: Signer;

  beforeEach(async () => {
    weth = await deployWETH();
    accounts = await ethers.getSigners();
    [marketAccount] = await ethers.getSigners();
  });

  describe("#constructor", () => {
    it("should be able to deploy", async () => {
      const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
      const roniaMarket = await RoniaMarket.deploy(
        weth.address,
        marketAccount.getAddress()
      );

      expect(await roniaMarket.getPlatformAccount()).to.eq(
        await marketAccount.getAddress(),
        "incorrect marketAccount address"
      );
      // expect(await roniaMarket.minBidIncrementPercentage()).to.eq(
      //   5,
      //   "minBidIncrementPercentage should equal 5%"
      // );
    });
  });
});