const { ethers } = require('hardhat');
const { expect } = require('chai');
const tokens = require('./tokens.json');
const { deployWETH } = require("../utils");

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}


describe('Ronia721', function () {
  before(async function () {
    this.accounts = await ethers.getSigners();
  });

  describe('Mint 10 tokens', function () {
    before(async function () {
      weth = await deployWETH();
      console.log(weth.address);
      this.roniaMarket = await deploy('RoniaMarket', weth.address, this.accounts[0].address);
      this.roniaNft = await deploy('Ronia721', 'Ronia721', 'RNT', this.roniaMarket.address);
    });

    for (let i = 1; i <= 10; i++) {
      it('mint the token', async function () {
        let tokenURI = "http://token.com/" + i;
        await expect(this.roniaNft.connect(this.accounts[1]).mint(tokenURI))
          .to.emit(this.roniaNft, 'Transfer')
          .withArgs(ethers.constants.AddressZero, this.accounts[1].address, i);
      });
    }
  });
});