import chai, { expect } from "chai";
import asPromised from "chai-as-promised";
// @ts-ignore
import { ethers } from "hardhat";
import { RoniaMarket, Ronia721, WETH } from "../../typechain-types";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber, Contract, Signer } from "ethers";
import { Address } from "ethereumjs-util";
const { deployWETH, deployRonia721, ONE_ETH } = require("../utils");

chai.use(asPromised);

describe("RoniaMarket", () => {
  let weth: Contract;
  let roniaMarket: RoniaMarket;
  let ronia721: Ronia721;
  let accounts: Array<Signer>;
  let marketAccount: Signer;
  let ethCurrency: string = ethers.constants.AddressZero;

  beforeEach(async () => {
    weth = await deployWETH();
    accounts = await ethers.getSigners();
    marketAccount = accounts[0];
    const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
    roniaMarket = (await RoniaMarket.deploy(
      weth.address,
      marketAccount.getAddress()
    )) as RoniaMarket;
    ronia721 = await deployRonia721(roniaMarket.address);
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
    });
  });
  describe("#createAuction", () => {
    let auctionCreator: Signer;
    beforeEach(async () => {
      auctionCreator = accounts[1];
      await ronia721.connect(auctionCreator).mint("http://token.com/");
    });

    it("should revert if token not found", async () => {
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      const [_, curator, __, ___, unapproved] = accounts;

      await expect(roniaMarket.connect(unapproved).createAuction(0, ronia721.address, startTime, endTime, reservePrice, ethCurrency))
        .eventually.rejectedWith(
          "nonexistent token"
        );
    });

    it("only token owner can create auction", async () => {
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      const [_, curator, __, ___, unapproved] = accounts;

      await expect(roniaMarket.connect(unapproved).createAuction(1, ronia721.address, startTime, endTime, reservePrice, ethCurrency))
        .eventually.rejectedWith(
          "Caller must be owner for token id"
        );
    });

    it("should create an auction", async () => {
      const tokenId = 1;
      await ronia721.connect(auctionCreator).mint("http://token.com/");
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      await roniaMarket.connect(auctionCreator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, ethCurrency);

      const createdAuction = await roniaMarket.auctions(0);

      expect(createdAuction.startTime).to.eq(startTime);
      expect(createdAuction.endTime).to.eq(endTime);
      expect(createdAuction.reservePrice).to.eq(
        BigNumber.from(10).pow(18).div(2)
      );
      expect(createdAuction.seller).to.eq(await auctionCreator.getAddress());
    });

    it("should emit an AuctionCreated event", async () => {
      const tokenId = 1;
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      await roniaMarket.connect(auctionCreator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, ethCurrency);

      const block = await ethers.provider.getBlockNumber();
      const auctionNumber = 0;
      const currAuction = await roniaMarket.auctions(auctionNumber);
      const events = await roniaMarket.queryFilter(
        roniaMarket.filters.AuctionCreated(
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ),
        block
      );
      expect(events.length).eq(1);
      const logDescription = roniaMarket.interface.parseLog(events[0]);
      expect(logDescription.name).to.eq("AuctionCreated");
      expect(logDescription.args.startTime).to.eq(currAuction.startTime);
      expect(logDescription.args.endTime).to.eq(currAuction.endTime);
      expect(logDescription.args.reservePrice).to.eq(currAuction.reservePrice);
      expect(logDescription.args.seller).to.eq(currAuction.seller);
      expect(logDescription.args.auctionCurrency).to.eq(
        ethCurrency
      );
    });
  });
  describe("#placeBid", () => {
    let admin: Signer;
    let curator: Signer;
    let bidderA: Signer;
    let bidderB: Signer;
    beforeEach(async () => {
      [admin, curator, bidderA, bidderB] = accounts;
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, ethCurrency);
    });

    it("should revert if the specified auction does not exist", async () => {
      await expect(
        roniaMarket.placeBid(11111, ONE_ETH)
      ).eventually.rejectedWith(`Auction is not exist or finished!`);
    });
  });
});