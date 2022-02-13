
import { ethers } from "hardhat";
import RoniaMarket from '../../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';


async function main() {
    let accounts = await ethers.getSigners();

    const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, accounts[0])

    await roniaMarket.endAuction(4)

}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
