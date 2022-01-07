import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_ENDPOINT
  );
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

  // We get the contract to deploy
  const RoniaMarket = await ethers.getContractFactory(
    "RoniaMarket",
    wallet
  )

  console.log(
    `Deploying RoniaMarket from deployment address ${wallet.address}...`
  );

  const impl = await RoniaMarket.deploy(
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
