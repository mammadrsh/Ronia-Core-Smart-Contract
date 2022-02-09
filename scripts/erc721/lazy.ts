
import { ethers } from "hardhat";
import {Contract, Signer } from "ethers";
const { deployWETH } = require("../test/utils");


async function main() {
  let accounts = await ethers.getSigners();
  //deploy roniaMarket
  const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
  const roniaMarket = await RoniaMarket.deploy(
      await accounts[0].getAddress()
  );
  await roniaMarket.deployed();
  console.log("roniaMarket deployed to:", roniaMarket.address);

  //deploy ronia721
  const Ronia721 = await ethers.getContractFactory("Ronia721");
  const ronia721 = await Ronia721.deploy('Ronia721', 'RNT', roniaMarket.address)
  await ronia721.deployed();
  console.log("roniaNFT deployed to:", ronia721.address);

  //deploy weth
  let wethAddress: string;
  let weth: WETH;
  [wethAddress, weth] = await deployWETH();
  console.log("WETH deployed to:", wethAddress);
    
}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
