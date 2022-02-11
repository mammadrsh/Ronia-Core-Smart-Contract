
import { ethers } from "hardhat";
import RoniaMarket from '../../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';
import WETH from '../../artifacts/contracts/other/weth.sol/WETH.json';
import { toEther } from "../../test/utils";



async function main() {
  const provider= new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(process.env.WALLET_PK || '', provider);

  const wethAddress = process.env.WETH_ADDRESS;
  const weth = new ethers.Contract(wethAddress || '', WETH.abi, provider)
  // await weth.connect(signer).deposit({ value: toEther("20") })
  console.log(await weth.balanceOf(await signer.getAddress()))
  const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, signer)

  await roniaMarket.placeBid(4, toEther("9"))

}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
