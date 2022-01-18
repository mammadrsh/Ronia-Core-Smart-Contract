import { ethers } from "hardhat";
import {
    WETH,
    Ronia721,
} from "../typechain-types";
import { BigNumber, Contract, Signer } from "ethers";

export const deployWETH = async () => {
    const [deployer] = await ethers.getSigners();
    const Weth = await (await ethers.getContractFactory("WETH")).deploy();
    const weth = await Weth.deployed()
    return [weth.address, Weth as WETH];
};

export const deployRonia721 = async (marketAddress: Contract) => {
    const [deployer] = await ethers.getSigners();
    return (await (await ethers.getContractFactory("Ronia721")).deploy("Ronia721", "RNT", marketAddress)) as Ronia721;
};

export const toEther = (eth: string) => {
    return ethers.utils.parseUnits(eth, "ether") as BigNumber;
}

export const TENTH_ETH = ethers.utils.parseUnits("0.1", "ether") as BigNumber;
export const ONE_ETH = ethers.utils.parseUnits("1", "ether") as BigNumber;
export const TWO_ETH = ethers.utils.parseUnits("2", "ether") as BigNumber;