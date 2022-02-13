
import { ethers } from "hardhat";
import {BigNumber, providers } from "ethers";
import RoniaMarket from '../../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';
import WETH from '../../artifacts/contracts/other/weth.sol/WETH.json';
const { deployWETH } = require("../../test/utils");


async function main() {
  let accounts = await ethers.getSigners();
  const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, accounts[0])

  const wethAddress = process.env.WETH_ADDRESS;
  const startTime = Math.floor(Date.now() / 1000);
  // const endTime = startTime + (60 * 60 * 24);
  const endTime = startTime + (60 * 15);
  const reservePrice = BigNumber.from(10).pow(18).div(2);
  await roniaMarket.createAuction(3, process.env.Ronia721_Address || '', startTime, endTime, reservePrice, wethAddress)

}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
