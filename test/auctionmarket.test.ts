import chai, { expect } from "chai";
import asPromised from "chai-as-promised";
// @ts-ignore
import { ethers } from "hardhat";
import { AuctionHouse, BadBidder, TestERC721, BadERC721 } from "../typechain";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber, Contract, Signer } from "ethers";
import {
  approveAuction,
  deployBidder,
  deployOtherNFTs,
  deployWETH,
  deployZoraProtocol,
  mint,
  ONE_ETH,
  revert,
  TWO_ETH,
} from "./utils";

chai.use(asPromised);

describe("#constructor", () => {
    it("should be able to deploy", async () => {
      const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
      const auctionHouse = await AuctionHouse.deploy(
        media.address,
        weth.address
      );

      expect(await auctionHouse.zora()).to.eq(
        media.address,
        "incorrect zora address"
      );
      expect(formatUnits(await auctionHouse.timeBuffer(), 0)).to.eq(
        "900.0",
        "time buffer should equal 900"
      );
      expect(await auctionHouse.minBidIncrementPercentage()).to.eq(
        5,
        "minBidIncrementPercentage should equal 5%"
      );
    });

    it("should not allow a configuration address that is not the Zora Media Protocol", async () => {
      const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
      await expect(
        AuctionHouse.deploy(market.address, weth.address)
      ).eventually.rejectedWith("Transaction reverted without a reason");
    });
  });
