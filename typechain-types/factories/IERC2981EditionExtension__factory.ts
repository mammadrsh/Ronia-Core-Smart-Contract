/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IERC2981EditionExtension,
  IERC2981EditionExtensionInterface,
} from "../IERC2981EditionExtension";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_editionId",
        type: "uint256",
      },
    ],
    name: "getRoyaltiesReceiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_editionId",
        type: "uint256",
      },
    ],
    name: "hasRoyalties",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IERC2981EditionExtension__factory {
  static readonly abi = _abi;
  static createInterface(): IERC2981EditionExtensionInterface {
    return new utils.Interface(_abi) as IERC2981EditionExtensionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC2981EditionExtension {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC2981EditionExtension;
  }
}
