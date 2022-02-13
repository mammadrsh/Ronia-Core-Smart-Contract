
import { ethers } from "hardhat";
import {BigNumber, providers } from "ethers";
import RoniaMarket from '../../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';
import WETH from '../../artifacts/contracts/other/weth.sol/WETH.json';
const { deployWETH } = require("../../test/utils");


async function main() {
  let accounts = await ethers.getSigners();
  const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, accounts[0])
  await roniaMarket.cancelItem(1)
}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
