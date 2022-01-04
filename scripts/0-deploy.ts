
import { ethers } from "hardhat";
import {Contract, Signer } from "ethers";
const { deployWETH } = require("../test/utils");


async function main() {
    let weth: Contract;
    weth = await deployWETH();
    let accounts = await ethers.getSigners();
    //deploy roniaMarket
    const RoniaMarket = await ethers.getContractFactory("RoniaMarket");
    const roniaMarket = await RoniaMarket.deploy(
        weth.address,
        accounts[0].address
    );
    await roniaMarket.deployed();
    console.log("roniaMarket deployed to:", roniaMarket.address);

    //deploy ronia721
    const Ronia721 = await ethers.getContractFactory("Ronia721");
    const ronia721 = await Ronia721.deploy('Ronia721', 'RNT', roniaMarket.address)
    await ronia721.deployed();
    console.log("roniaNFT deployed to:", ronia721.address);

    
    
}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
