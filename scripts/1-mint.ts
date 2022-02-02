
import { ethers } from "hardhat";
import {Contract, Signer } from "ethers";
import Ronia721 from '../artifacts/contracts/erc721/Ronia721.sol/Ronia721.json';
const { deployWETH } = require("../test/utils");


async function main() {
    let weth: Contract;
    weth = await deployWETH();
    let accounts = await ethers.getSigners();

    const ronia721 = new ethers.Contract(process.env.Ronia721_Address || '', Ronia721.abi, accounts[0])

    //mint 1 item to ronia721
    let tokenURI = "http://token.com/";
    await ronia721.mint(tokenURI)


}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
