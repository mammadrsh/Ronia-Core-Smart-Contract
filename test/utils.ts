import { ethers } from "hardhat";
import {
    WETH,
} from "../typechain-types";

export const deployWETH = async () => {
    const [deployer] = await ethers.getSigners();
    return (await (await ethers.getContractFactory("WETH")).deploy()) as WETH;
  };