import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const DEPLOYER_PRIVATE_KEY_LOCAL = process.env.DEPLOYER_PRIVATE_KEY_LOCAL;
const DEPLOYER_PRIVATE_KEY_RINKEBY = process.env.DEPLOYER_PRIVATE_KEY_RINKEBY;

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY_LOCAL}`]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY_RINKEBY}`]
    },
    localhost: {
      url: `http://127.0.0.1:8545`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY_LOCAL}`]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  // etherscan: {
  //   apiKey: "process.env.ETHERSCAN_API_KEY",
  // },
};

export default config;
