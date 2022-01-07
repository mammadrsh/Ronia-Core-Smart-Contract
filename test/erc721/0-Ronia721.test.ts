const { ethers } = require('hardhat');
const { expect } = require('chai');
const tokens = require('./tokens.json');
const { deployWETH } = require("../utils");
import { RoniaMarket, Ronia721, WETH } from "../../typechain-types";
import {Contract, Signer } from "ethers";

async function deploy(name: string, ...params: string[]) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then((f: { deployed: () => any; }) => f.deployed());
}


describe('Ronia721', function () {
  let weth: Contract;
  let roniaMarket: RoniaMarket;
  let ronia721: Ronia721;
  let accounts: Array<Signer>;
  before(async function () {
    accounts = await ethers.getSigners();
  });

  describe('Mint 10 tokens', function () {
    before(async function () {
      weth = await deployWETH();
      console.log(weth.address);
      roniaMarket = await deploy('RoniaMarket', await accounts[0].getAddress());
      ronia721 = await deploy('Ronia721', 'Ronia721', 'RNT', roniaMarket.address);
    });

    for (let i = 1; i <= 10; i++) {
      it('mint the token', async function () {
        let tokenURI = "http://token.com/" + i;
        let tokenId = await ronia721.mint("http://token.com/");
        // console.log(tokenId);
        // expect(tokenId).to.eq(i);
        expect(tokenId)
          .to.emit(ronia721, 'Transfer')
          .withArgs(ethers.constants.AddressZero, await accounts[0].getAddress(), i);
      });
    }
  });
});