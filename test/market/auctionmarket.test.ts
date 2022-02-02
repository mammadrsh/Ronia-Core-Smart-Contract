import chai, { expect } from "chai";
import asPromised from "chai-as-promised";
// @ts-ignore
import { ethers } from "hardhat";
import { RoniaMarket, Ronia721, WETH } from "../../typechain-types";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber, Contract, Signer } from "ethers";
import { Address } from "ethereumjs-util";
const { deployWETH, deployRonia721, toEther } = require("../utils");

chai.use(asPromised);

describe("RoniaMarket", () => {
  let wethAddress: string;
  let weth: WETH;
  let roniaMarket: RoniaMarket;
  let ronia721: Ronia721;
  let accounts: Array<Signer>;
  let marketAccount: Signer;

  beforeEach(async () => {
    [wethAddress, weth] = await deployWETH();
    accounts = await ethers.getSigners();
    marketAccount = accounts[0];
    const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
    roniaMarket = (await RoniaMarket.deploy(
      marketAccount.getAddress()
    )) as RoniaMarket;
    ronia721 = await deployRonia721(roniaMarket.address);
  });

  describe("#constructor", () => {
    it("should be able to deploy", async () => {
      const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
      const roniaMarket = await RoniaMarket.deploy(
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

      await expect(roniaMarket.connect(unapproved).createAuction(0, ronia721.address, startTime, endTime, reservePrice, wethAddress))
        .eventually.rejectedWith(
          "nonexistent token"
        );
    });

    it("only token owner can create auction", async () => {
      const startTime = Date.now();
      const endTime = startTime + (60 * 60 * 24);
      const reservePrice = BigNumber.from(10).pow(18).div(2);
      const [_, curator, __, ___, unapproved] = accounts;

      await expect(roniaMarket.connect(unapproved).createAuction(1, ronia721.address, startTime, endTime, reservePrice, wethAddress))
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
      await roniaMarket.connect(auctionCreator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);

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
      await roniaMarket.connect(auctionCreator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);

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
        wethAddress
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
      weth.connect(curator).deposit({ value: toEther("20") })
      weth.connect(bidderA).deposit({ value: toEther("20") })
      weth.connect(bidderB).deposit({ value: toEther("20") })
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(startTime + (60 * 60 * 24));
      const reservePrice = toEther("0.1");
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);
    });

    it("should revert if the specified auction does not exist", async () => {
      await expect(
        roniaMarket.placeBid(11111, toEther("1"))
      ).eventually.rejectedWith(`Auction is not exist or finished!`);
    });

    it("should revert if the bid is less than the reserve price", async () => {
      const blockNumber = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNumber);
      await expect(
        roniaMarket.placeBid(0, 0)
      ).eventually.rejectedWith(`Must send at least reservePrice`);
    });

    it("should revert if amount not approved for market", async () => {
      await expect(
        roniaMarket.placeBid(0, toEther("1"))
      ).eventually.rejectedWith(`Bidder Should approve market for bid amount`);
    });
    describe("first bid", () => {
      beforeEach(async () => {
        await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
      });
      it("should not update the auction's endtime", async () => {
        const beforeEndTime = (await roniaMarket.auctions(0)).endTime;
        await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));
        const afterEndTime = (await roniaMarket.auctions(0)).endTime;

        expect(beforeEndTime).to.eq(afterEndTime);
      });
      it("should store the bidder's information", async () => {
        await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));
        const currentAuction = await roniaMarket.auctions(0);

        expect(currentAuction.bidder).to.eq(await bidderA.getAddress());
        expect(currentAuction.bid).to.eq(toEther("1"));
      });
      it("should approve funds for market", async () => {
        const bid = toEther("1");
        await roniaMarket.connect(bidderA).placeBid(0, bid);
        // await weth.connect(bidderA).approve(await roniaMarket.address, bid);
        const currentAuction = await roniaMarket.auctions(0);
        const approveScale = await (await roniaMarket.approveScale()).toNumber();
        const modulo = await (await roniaMarket.modulo()).toNumber();
        const allowance = await (await weth.allowance(await bidderA.getAddress(), await roniaMarket.address));
        const shouldApprove = bid * (approveScale / modulo);

        expect(ethers.utils.formatEther(allowance.toString())).to.eq(ethers.utils.formatEther(bid.toString()));
      });
      it("should emit an AuctionBided event", async () => {
        const block = await ethers.provider.getBlockNumber();
        await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));

        const events = await roniaMarket.queryFilter(
          roniaMarket.filters.AuctionBidded(
            null,
            null,
            null,
            null,
          ),
          block
        );
        expect(events.length).eq(1);
        const logDescription = roniaMarket.interface.parseLog(events[0]);

        expect(logDescription.name).to.eq("AuctionBidded");
        expect(logDescription.args.auctionId).to.eq(0);
        expect(logDescription.args.sender).to.eq(await bidderA.getAddress());
        expect(logDescription.args.amount).to.eq(toEther("1"));
        expect(logDescription.args.extended).to.eq(false);
      });
    });
    describe("second bid", () => {
      beforeEach(async () => {
        roniaMarket = roniaMarket.connect(bidderB) as RoniaMarket;
        await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
        await roniaMarket
          .connect(bidderA)
          .placeBid(0, toEther("1"));
      });
      it("should revert if the bid is smaller than the last bid + minBid", async () => {
        await expect
          (
            roniaMarket.placeBid(0, toEther("1"))
          ).eventually.rejectedWith(
            'Must send more than last bid by minBidIncrementPercentage amount'
          );
      });
      it("should update the stored bid information", async () => {
        await weth.connect(bidderB).approve(await roniaMarket.address, toEther("2"));
        await roniaMarket.placeBid(0, toEther("2"));

        const currAuction = await roniaMarket.auctions(0);

        expect(currAuction.bid).to.eq(toEther("2"));
        expect(currAuction.bidder).to.eq(await bidderB.getAddress());
      });
      it("should not extend the duration of the bid if outside of the time buffer", async () => {
        const beforeEndTime = (await roniaMarket.auctions(0)).endTime;
        await weth.connect(bidderB).approve(await roniaMarket.address, toEther("2"));
        await roniaMarket.placeBid(0, toEther("2"));
        const afterEndTime = (await roniaMarket.auctions(0)).endTime;
        expect(beforeEndTime).to.eq(afterEndTime);
      });
      it("should emit an AuctionBidded event", async () => {
        const block = await ethers.provider.getBlockNumber();
        await weth.connect(bidderB).approve(await roniaMarket.address, toEther("2"));
        await roniaMarket.placeBid(0, toEther("2"));
        const events = await roniaMarket.queryFilter(
          roniaMarket.filters.AuctionBidded(
            null,
            null,
            null,
            null,
          ),
          block
        );
        expect(events.length).eq(2);
        const logDescription = roniaMarket.interface.parseLog(events[1]);

        expect(logDescription.name).to.eq("AuctionBidded");
        expect(logDescription.args.auctionId).to.eq(0);
        expect(logDescription.args.sender).to.eq(await bidderB.getAddress());
        expect(logDescription.args.amount).to.eq(toEther("2"));
        expect(logDescription.args.extended).to.eq(false);
      });
    });
    describe("last minute bid", () => {
      beforeEach(async () => {
        const currentAuction = await roniaMarket.auctions(0);
        await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
        await ethers.provider.send("evm_setNextBlockTimestamp", [
          currentAuction.endTime
            .sub(1)
            .toNumber(),
        ]);
      });
      it("should extend the duration of the bid if inside of the time buffer", async () => {
        const beforeEndTime = (await roniaMarket.auctions(0)).endTime;
        await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));

        const currAuction = await roniaMarket.auctions(0);
        expect(currAuction.endTime).to.eq(
          beforeEndTime.add(await roniaMarket.extentionWindow())
        );
      });
    });
    describe("late bid", () => {
      beforeEach(async () => {
        const currAuction = await roniaMarket.auctions(0);
        await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
        await ethers.provider.send("evm_setNextBlockTimestamp", [
          currAuction.endTime
            .add(10)
            .toNumber(),
        ]);
      });

      it("should revert if the bid is placed after expiry", async () => {
        await expect(
          roniaMarket.connect(bidderA).placeBid(0, toEther("1"))
        ).eventually.rejectedWith('Auction expired');
      });
    });
  });
  describe("#updateAuction", () => {
    let admin: Signer;
    let curator: Signer;
    let bidderA: Signer;
    let bidderB: Signer;
    beforeEach(async () => {
      [admin, curator, bidderA, bidderB] = accounts;
      weth.connect(curator).deposit({ value: toEther("20") })
      weth.connect(bidderA).deposit({ value: toEther("20") })
      weth.connect(bidderB).deposit({ value: toEther("20") })
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(startTime + (60 * 60 * 24 * 7));
      const reservePrice = toEther("0.1");
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);

    });
    it('Should revert if not auction owner', async () => {
      await expect(roniaMarket.connect(bidderA).updateAuction(0, toEther("0.2"))).eventually.rejectedWith('Must be auction creator')
    });
    it('Should revert if auction is not exist', async () => {
      await expect(roniaMarket.connect(curator).updateAuction(11111, toEther("0.2"))).eventually.rejectedWith('Auction is not exist or finished!')
    });
    it('Should revert if auction has a bidder', async () => {
      const block = await (await ethers.provider.getBlock(ethers.provider.getBlockNumber())).timestamp;
      await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
      await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));
      await expect(roniaMarket.connect(curator).updateAuction(0, toEther("0.2"))).eventually.rejectedWith('Auction has a bidder')
    });
    it('Should change auction reservePrice', async () => {
      await roniaMarket.connect(curator).updateAuction(0, toEther("0.2"))
      expect((await roniaMarket.auctions(0)).reservePrice).to.eq(toEther("0.2"));
    });
  });
  describe("#cancelAuction", () => {
    let admin: Signer;
    let curator: Signer;
    let bidderA: Signer;
    let bidderB: Signer;
    beforeEach(async () => {
      [admin, curator, bidderA, bidderB] = accounts;
      weth.connect(curator).deposit({ value: toEther("20") })
      weth.connect(bidderA).deposit({ value: toEther("20") })
      weth.connect(bidderB).deposit({ value: toEther("20") })
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(startTime + (60 * 60 * 24 * 7));
      const reservePrice = toEther("0.1");
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);
    });

    it("should revert if the auction does not exist", async () => {
      await expect(roniaMarket.cancelAuction(12213)).eventually.rejectedWith(
        'Auction is not exist or finished!'
      );
    });
    it("should revert if not called by creator", async () => {
      await expect(
        roniaMarket.connect(bidderA).cancelAuction(0)
      ).eventually.rejectedWith(
        'Can only be called by auction creator'
      );
    });
    it("should not have a bidder", async () => {
      await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
      await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));
      await expect(
        roniaMarket.connect(curator).cancelAuction(0)
      ).eventually.rejectedWith(
        'Auction has a bidder'
      );
    });

    it("should be callable by the creator", async () => {
      await roniaMarket.connect(curator).cancelAuction(0);

      const auctionResult = await roniaMarket.auctions(0);

      expect(auctionResult.bid.toNumber()).to.eq(0);
      expect(auctionResult.startTime.toNumber()).to.eq(0);
      expect(auctionResult.endTime.toNumber()).to.eq(0);
      expect(auctionResult.reservePrice.toNumber()).to.eq(0);
      expect(auctionResult.bidder).to.eq(ethers.constants.AddressZero);
      expect(auctionResult.seller).to.eq(ethers.constants.AddressZero);
      expect(auctionResult.auctionCurrency).to.eq(ethers.constants.AddressZero);

      expect(await ronia721.ownerOf(1)).to.eq(await curator.getAddress());
    });
    it("should emit an AuctionCanceled event", async () => {
      const block = await ethers.provider.getBlockNumber();
      await roniaMarket.connect(curator).cancelAuction(0);
      const events = await roniaMarket.queryFilter(
        roniaMarket.filters.AuctionCanceled(null),
        block
      );
      expect(events.length).eq(1);
      const logDescription = roniaMarket.interface.parseLog(events[0]);

      expect(logDescription.args.auctionId.toNumber()).to.eq(0);
    });
  });
  describe("#endAuction", () => {
    let admin: Signer;
    let curator: Signer;
    let bidderA: Signer;
    let bidderB: Signer;
    beforeEach(async () => {
      [admin, curator, bidderA, bidderB] = accounts;
      weth.connect(curator).deposit({ value: toEther("20") })
      weth.connect(bidderA).deposit({ value: toEther("20") })
      weth.connect(bidderB).deposit({ value: toEther("20") })
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(startTime + (60 * 60 * 24 * 7));
      const reservePrice = toEther("0.1");
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);
    });
    it("should revert if the auction does not exist", async () => {
      await expect(roniaMarket.cancelAuction(12213)).eventually.rejectedWith(
        'Auction is not exist or finished!'
      );
    });
    it("should revert if the Auction hasn't completed", async () => {
      await expect(roniaMarket.endAuction(0)).eventually.rejectedWith(
        "Auction hasn't completed"
      );
    });
    it("should revert if the auction has no bidder", async () => {
      const currAuction = await roniaMarket.auctions(0);
      await ethers.provider.send("evm_setNextBlockTimestamp", [
        currAuction.endTime
          .add(10)
          .toNumber(),
      ]);
      await expect(roniaMarket.endAuction(0)).eventually.rejectedWith(
        "Auction has no bidder, you can cancel the Auction."
      );
    });
  });
  describe("#WETH auction bid and end", () => {
    let admin: Signer;
    let curator: Signer;
    let bidderA: Signer;
    let bidderB: Signer;
    beforeEach(async () => {
      [admin, curator, bidderA, bidderB] = accounts;
      weth.connect(curator).deposit({ value: toEther("20") })
      weth.connect(bidderA).deposit({ value: toEther("20") })
      weth.connect(bidderB).deposit({ value: toEther("20") })
      const tokenId = 1;
      await ronia721.connect(curator).mint("http://token.com/");
      const startTime = Math.floor(Date.now() / 1000);
      const endTime = Math.floor(startTime + (60 * 60 * 24 * 8));
      const reservePrice = toEther("0.1");
      await roniaMarket.connect(curator).createAuction(tokenId, ronia721.address, startTime, endTime, reservePrice, wethAddress);
      await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
      await roniaMarket.connect(bidderA).placeBid(0, toEther("1"));
      await ethers.provider.send("evm_setNextBlockTimestamp", [
        endTime + 10,
      ]);
    });

    it("should transfer the NFT to the winning bidder && Transfer fee to market && Transfer rest to seller", async () => {
      const beforCuratorBalance = ethers.utils.formatEther(await weth.balanceOf(await curator.getAddress()));

      await roniaMarket.endAuction(0);

      expect(await ronia721.ownerOf(1)).to.eq(await bidderA.getAddress());

      const feePercentage = await (await roniaMarket.serviceFee()).toNumber();
      const modulo = await (await roniaMarket.modulo()).toNumber();
      const marketAccountBalance = await weth.balanceOf(await marketAccount.getAddress());
      const expectedFee = (feePercentage / modulo) * toEther("1");

      expect(ethers.utils.formatEther(expectedFee.toString())).to.eq(ethers.utils.formatEther(marketAccountBalance.toString()));

      const afterCuratorBalance = ethers.utils.formatEther(await weth.balanceOf(await curator.getAddress()));
      
      const expectedCuratorBalance = parseFloat(afterCuratorBalance) - parseFloat(beforCuratorBalance);
      const expectedAmount = toEther("1") - ((feePercentage / modulo) * toEther("1"));
      expect(ethers.utils.formatEther(expectedAmount.toString())).to.eq(expectedCuratorBalance.toFixed(3));
    });
  });
});