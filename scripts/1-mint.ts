
import { ethers } from "hardhat";
import {Contract, Signer } from "ethers";
import Ronia721 from '../artifacts/contracts/erc721/Ronia721.sol/Ronia721.json';
import RoniaMarket from '../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';
const { deployWETH } = require("../test/utils");


async function main() {
    let weth: Contract;
    weth = await deployWETH();
    let accounts = await ethers.getSigners();

    const ronia721 = new ethers.Contract(process.env.Ronia721_Address || '', Ronia721.abi, accounts[0])

    const provider= new ethers.providers.JsonRpcProvider()
    const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, accounts[0])
    //mint 1 item to ronia721
    let tokenURI = "http://token.com/";
    await ronia721.connect(accounts[0]).mint(tokenURI)


}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
