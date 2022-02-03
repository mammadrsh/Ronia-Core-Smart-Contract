import chai, { expect } from "chai";
import asPromised from "chai-as-promised";
// @ts-ignore
import { ethers } from "hardhat";
import { RoniaMarket, Ronia721, WETH } from "../../typechain-types";
import { BigNumber, Contract, Signer } from "ethers";
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
        let itemCreator: Signer;
        beforeEach(async () => {
            itemCreator = accounts[1];
            await ronia721.connect(itemCreator).mint("http://token.com/");
        });
        it("should revert if token not found", async () => {
            const reservePrice = BigNumber.from(10).pow(18).div(2);
            const [_, curator, __, ___, unapproved] = accounts;

            await expect(roniaMarket.connect(unapproved).createItem(0, ronia721.address, reservePrice, wethAddress))
                .eventually.rejectedWith(
                    "nonexistent token"
                );
        });

        it("only token owner can create item", async () => {
            const reservePrice = BigNumber.from(10).pow(18).div(2);
            const [_, curator, __, ___, unapproved] = accounts;

            await expect(roniaMarket.connect(unapproved).createItem(1, ronia721.address, reservePrice, wethAddress))
                .eventually.rejectedWith(
                    "Caller must be owner for token id"
                );
        });

        it("should create a buyNowItem", async () => {
            const tokenId = 1;
            await ronia721.connect(itemCreator).mint("http://token.com/");
            const reservePrice = BigNumber.from(10).pow(18).div(2);
            await expect(roniaMarket.connect(itemCreator).createItem(tokenId, ronia721.address, reservePrice, wethAddress))

            const createdItem = await roniaMarket.items(0);

            expect(createdItem.reservePrice).to.eq(
                BigNumber.from(10).pow(18).div(2)
            );
            expect(createdItem.seller).to.eq(await itemCreator.getAddress());
        });

        it("should emit an BuyNowItemCreated event", async () => {
            const tokenId = 1;
            const reservePrice = BigNumber.from(10).pow(18).div(2);
            await expect(roniaMarket.connect(itemCreator).createItem(tokenId, ronia721.address, reservePrice, wethAddress))

            const block = await ethers.provider.getBlockNumber();
            const auctionNumber = 0;
            const currItem = await roniaMarket.items(auctionNumber);
            const events = await roniaMarket.queryFilter(
                roniaMarket.filters.BuyNowItemCreated(
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
            expect(logDescription.name).to.eq("BuyNowItemCreated");
            expect(logDescription.args.reservePrice).to.eq(currItem.reservePrice);
            expect(logDescription.args.seller).to.eq(currItem.seller);
            expect(logDescription.args.currency).to.eq(
                wethAddress
            );
        });
    });
    describe("#updateItem", () => {
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
            const reservePrice = toEther("0.1");
            await expect(roniaMarket.connect(curator).createItem(tokenId, ronia721.address, reservePrice, wethAddress))
        });
        it('Should revert if not item owner', async () => {
            await expect(roniaMarket.connect(bidderA).updateItem(0, toEther("0.2"))).eventually.rejectedWith('Must be Item creator')
        });
        it('Should revert if item is not exist', async () => {
            await expect(roniaMarket.connect(curator).updateItem(11111, toEther("0.2"))).eventually.rejectedWith('Item is not exist or already purchased!')
        });
        it('Should change item reservePrice', async () => {
            await roniaMarket.connect(curator).updateItem(0, toEther("0.2"))
            expect((await roniaMarket.items(0)).reservePrice).to.eq(toEther("0.2"));
        });
    });
    describe("#cancelItem", () => {
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
            const reservePrice = toEther("0.1");
            await expect(roniaMarket.connect(curator).createItem(tokenId, ronia721.address, reservePrice, wethAddress))
        });
        it('Should revert if not item owner', async () => {
            await expect(roniaMarket.connect(bidderA).cancelItem(0)).eventually.rejectedWith('Must be Item creator')
        });
        it('Should revert if item is not exist', async () => {
            await expect(roniaMarket.connect(curator).cancelItem(11111)).eventually.rejectedWith('Item is not exist or already purchased!')
        });
        it('Should cancel item', async () => {
            await roniaMarket.connect(curator).cancelItem(0);

            const item = await roniaMarket.items(0);

            expect(item.reservePrice.toNumber()).to.eq(0);
            expect(item.seller).to.eq(ethers.constants.AddressZero);
            expect(item.currency).to.eq(ethers.constants.AddressZero);

            expect(await ronia721.ownerOf(1)).to.eq(await curator.getAddress());
        });

        it("should emit an BuyNowItemCanceled event", async () => {
            const block = await ethers.provider.getBlockNumber();
            await roniaMarket.connect(curator).cancelItem(0);
            const events = await roniaMarket.queryFilter(
                roniaMarket.filters.BuyNowItemCanceled(null),
                block
            );
            expect(events.length).eq(1);
            const logDescription = roniaMarket.interface.parseLog(events[0]);

            expect(logDescription.args.itemId.toNumber()).to.eq(0);
        });
    });
    describe("#purchaseItem", () => {
        let admin: Signer;
        let curator: Signer;
        let bidderA: Signer;
        let bidderB: Signer;
        let bidderC: Signer;
        beforeEach(async () => {
            [admin, curator, bidderA, bidderB, bidderC] = accounts;
            weth.connect(curator).deposit({ value: toEther("20") })
            weth.connect(bidderA).deposit({ value: toEther("1") })
            weth.connect(bidderB).deposit({ value: toEther("20") })
            weth.connect(bidderC).deposit({ value: toEther("20") })
            await weth.connect(bidderA).approve(await roniaMarket.address, toEther("1"));
            await weth.connect(bidderB).approve(await roniaMarket.address, toEther("20"));
            await weth.connect(bidderC).approve(await roniaMarket.address, toEther("20"));
            await weth.connect(bidderB).withdraw(toEther("19"));
            const tokenId = 1;
            await ronia721.connect(curator).mint("http://token.com/");
            const reservePrice = toEther("5");
            await expect(roniaMarket.connect(curator).createItem(tokenId, ronia721.address, reservePrice, wethAddress))
        });
        it('Should revert if owner purchase', async () => {
            await expect(roniaMarket.connect(curator).purchaseItem(0)).eventually.rejectedWith('Must not be Item creator')
        });
        it('Should revert if item is not exist', async () => {
            await expect(roniaMarket.connect(bidderA).purchaseItem(11111)).eventually.rejectedWith('Item is not exist or already purchased!')
        });
        it('Should revert if user not approved market for reservePrice', async () => {
            await expect(roniaMarket.connect(bidderA).purchaseItem(0)).eventually.rejectedWith('Bidder Should approve market for bid amount')
        });
        it('Should revert if user has not enought money', async () => {
            await expect(roniaMarket.connect(bidderB).purchaseItem(0)).eventually.rejectedWith('ERC20: transfer amount exceeds balance')
        });
        it('should transfer the NFT to the buyer && Transfer fee to market && Transfer rest to seller', async () => {
            const beforCuratorBalance = ethers.utils.formatEther(await weth.balanceOf(await curator.getAddress()));
            
            await roniaMarket.connect(bidderC).purchaseItem(0)
            
            expect(await ronia721.ownerOf(1)).to.eq(await bidderC.getAddress());

            const feePercentage = await (await roniaMarket.serviceFee()).toNumber();
            const modulo = await (await roniaMarket.modulo()).toNumber();
            const marketAccountBalance = await weth.balanceOf(await marketAccount.getAddress());
            const expectedFee = (feePercentage / modulo) * toEther("5");

            expect(ethers.utils.formatEther(expectedFee.toString())).to.eq(ethers.utils.formatEther(marketAccountBalance.toString()));

            const afterCuratorBalance = ethers.utils.formatEther(await weth.balanceOf(await curator.getAddress()));

            const expectedCuratorBalance = parseFloat(afterCuratorBalance) - parseFloat(beforCuratorBalance);
            const expectedAmount = toEther("5") - ((feePercentage / modulo) * toEther("5"));
            expect(ethers.utils.formatEther(expectedAmount.toString())).to.eq(expectedCuratorBalance.toFixed(3));

        });
    });
});