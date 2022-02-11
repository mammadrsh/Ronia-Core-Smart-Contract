
import { ethers } from "hardhat";
import RoniaMarket from '../../artifacts/contracts/market/RoniaMarket.sol/RoniaMarket.json';
import WETH from '../../artifacts/contracts/other/weth.sol/WETH.json';
import { toEther } from "../../test/utils";



async function main() {
  const provider= new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(process.env.WALLET_PK || '', provider);

  const wethAddress = process.env.WETH_ADDRESS;
  const weth = new ethers.Contract(wethAddress || '', WETH.abi, provider)
  await weth.connect(signer).deposit({ value: toEther("20") })
  await weth.connect(signer).approve(process.env.Ronia_Market_Address || '', toEther("20"))

  const roniaMarket = new ethers.Contract(process.env.Ronia_Market_Address || '', RoniaMarket.abi, signer)

  console.log("Before purchase", await weth.balanceOf(await signer.getAddress()))
  await roniaMarket.purchaseItem(1)
  console.log("After purchase", await weth.balanceOf(await signer.getAddress()))
}





main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
