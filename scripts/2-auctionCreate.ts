
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

    let transaction = await roniaMarket.connect(accounts[0]).createAuction(1, process.env.Ronia721_Address || '', 12345, 13456, 98000, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")

}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
