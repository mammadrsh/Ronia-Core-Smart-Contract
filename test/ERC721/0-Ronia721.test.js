const { ethers } = require('hardhat');
const { expect } = require('chai');
const tokens = require('./tokens.json');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}


describe('Ronia721', function () {
  before(async function() {
    this.accounts = await ethers.getSigners();
  });

  describe('Mint all elements', function () {
    before(async function() {
      this.registry = await deploy('Ronia721', 'Ronia721', 'RNT');
    });

    for (const [tokenId, account] of Object.entries(tokens)) {
      it('mint the token', async function () {
        await expect(this.registry.connect(this.accounts[1]).mint(account, tokenId))
          .to.emit(this.registry, 'Transfer')
          .withArgs(ethers.constants.AddressZero, account, tokenId);
      });
    }
  });
});