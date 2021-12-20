/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RoniaMarket, RoniaMarketInterface } from "../RoniaMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_platformAccount",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "extended",
        type: "bool",
      },
    ],
    name: "AuctionBided",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "AuctionCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "auctionCurrency",
        type: "address",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newEndTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "AuctionDurationExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AuctionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256",
      },
    ],
    name: "AuctionUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctions",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "auctionCurrency",
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
        name: "_id",
        type: "uint256",
      },
    ],
    name: "cancelAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_auctionCurrency",
        type: "address",
      },
    ],
    name: "createAuction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "endAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "extentionWindow",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "modulo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "placeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "platformAccount",
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
    inputs: [],
    name: "roniaAddress",
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
    inputs: [],
    name: "serviceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
    ],
    name: "updateAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wethAddress",
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
];

const _bytecode =
  "0x60806040526203d09060015562989680600255610384600660006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055503480156200005a57600080fd5b50604051620034d9380380620034d9833981810160405281019062000080919062000144565b8181600160008190555081600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505062000201565b6000815190506200012781620001cd565b92915050565b6000815190506200013e81620001e7565b92915050565b600080604083850312156200015857600080fd5b6000620001688582860162000116565b92505060206200017b858286016200012d565b9150509250929050565b60006200019282620001ad565b9050919050565b6000620001a682620001ad565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620001d88162000185565b8114620001e457600080fd5b50565b620001f28162000199565b8114620001fe57600080fd5b50565b6132c880620002116000396000f3fe6080604052600436106100a75760003560e01c806396b5a7551161006457806396b5a755146101b957806397849eb3146101e2578063b9a2de3a1461020d578063c82531a314610236578063e86487d814610273578063f22b01691461029e576100a7565b806329745262146100ac5780634f0e0ef3146100d7578063571a26a01461010257806357c90de51461014757806368d8ba28146101635780638abdf5aa1461018e575b600080fd5b3480156100b857600080fd5b506100c16102c7565b6040516100ce9190612ade565b60405180910390f35b3480156100e357600080fd5b506100ec6102cd565b6040516100f99190612707565b60405180910390f35b34801561010e57600080fd5b5061012960048036038101906101249190612258565b6102f3565b60405161013e99989796959493929190612782565b60405180910390f35b610161600480360381019061015c9190612333565b6103c1565b005b34801561016f57600080fd5b5061017861090f565b6040516101859190612707565b60405180910390f35b34801561019a57600080fd5b506101a3610935565b6040516101b09190612ade565b60405180910390f35b3480156101c557600080fd5b506101e060048036038101906101db9190612258565b61093b565b005b3480156101ee57600080fd5b506101f7610ade565b6040516102049190612707565b60405180910390f35b34801561021957600080fd5b50610234600480360381019061022f9190612258565b610b04565b005b34801561024257600080fd5b5061025d600480360381019061025891906122aa565b610f8d565b60405161026a9190612ade565b60405180910390f35b34801561027f57600080fd5b5061028861149c565b6040516102959190612ac3565b60405180910390f35b3480156102aa57600080fd5b506102c560048036038101906102c09190612333565b6114be565b005b60025481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60086020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040154908060050154908060060154908060070154908060080160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905089565b81600073ffffffffffffffffffffffffffffffffffffffff166008600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610467576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045e90612903565b60405180910390fd5b600260005414156104ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a490612a03565b60405180910390fd5b6002600081905550600060086000858152602001908152602001600020905060006008600086815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600082600701541161054e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610545906128e3565b60405180910390fd5b8160050154421015610595576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058c90612a63565b60405180910390fd5b816006015442106105db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d290612a23565b60405180910390fd5b8160040154841015610622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061990612a43565b60405180910390fd5b8160070154841015610669576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610660906128e3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106d1576106d08183600401548460080160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661169a565b5b6106ff848360080160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611871565b838260040181905550338260030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600660009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff1642846006015461078e9190612c88565b116107e057600660009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff1683600601546107d39190612ba7565b8360060181905550600190505b8260020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168360010154877f155a34215f387fb6f2d70401e59d444ac6a155efa908efde0cf098bf9ac838833389866040516108549392919061280f565b60405180910390a480156108ff578260020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168360010154877fbd00e5cf1db776b15044d51d0f7dc3256679bb96ac7fd2bf185241b7e84d96b88660060154600660009054906101000a90046fffffffffffffffffffffffffffffffff166040516108f6929190612af9565b60405180910390a45b5050506001600081905550505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b80600073ffffffffffffffffffffffffffffffffffffffff166008600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d890612903565b60405180910390fd5b60006008600084815260200190815260200160002090503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610a8a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a81906128a3565b60405180910390fd5b42816005015411610ad0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac790612923565b60405180910390fd5b610ad983611b18565b505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600073ffffffffffffffffffffffffffffffffffffffff166008600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610baa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba190612903565b60405180910390fd5b60026000541415610bf0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be790612a03565b60405180910390fd5b6002600081905550600060086000848152602001908152602001600020905042816006015411610c55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4c906129e3565b60405180910390fd5b60008160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000836004015490508360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e308587600101546040518463ffffffff1660e01b8152600401610d1593929190612722565b600060405180830381600087803b158015610d2f57600080fd5b505af1158015610d43573d6000803e3d6000fd5b50505050600060015460025483610d5a9190612bfd565b610d649190612c2e565b90506000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1682604051610dae906126f2565b60006040518083038185875af1925050503d8060008114610deb576040519150601f19603f3d011682016040523d82523d6000602084013e610df0565b606091505b5050905080610e34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2b906129a3565b60405180910390fd5b610e678487600401548860080160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1661169a565b60086000898152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560048201600090556005820160009055600682016000905560078201600090556008820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050877fd2aa34a4fdbbc6dff6a3e56f46e0f3ae2a31d7785ff3487aa5c95c642acea5018685604051610f73929190612759565b60405180910390a250505050505060016000819055505050565b600060026000541415610fd5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fcc90612a03565b60405180910390fd5b60026000819055508573ffffffffffffffffffffffffffffffffffffffff166301ffc9a76380ac58cd60e01b6040518263ffffffff1660e01b815260040161101d9190612846565b60206040518083038186803b15801561103557600080fd5b505afa158015611049573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106d919061222f565b6110ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a390612a83565b60405180910390fd5b60008673ffffffffffffffffffffffffffffffffffffffff16636352211e896040518263ffffffff1660e01b81526004016110e79190612ade565b60206040518083038186803b1580156110ff57600080fd5b505afa158015611113573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111379190612206565b90508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146111a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161119e90612883565b60405180910390fd5b60006111b36007611cfb565b90506040518061012001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018a81526020018973ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020018881526020018781526020018681526020018573ffffffffffffffffffffffffffffffffffffffff168152506008600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816004015560a0820151816005015560c0820151816006015560e082015181600701556101008201518160080160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508773ffffffffffffffffffffffffffffffffffffffff166323b872dd83308c6040518463ffffffff1660e01b81526004016113f193929190612722565b600060405180830381600087803b15801561140b57600080fd5b505af115801561141f573d6000803e3d6000fd5b5050505061142d6007611d09565b8773ffffffffffffffffffffffffffffffffffffffff1689827fb49e4eb6b92fa74bad742ffd78dac1125623d2a3080824b533e10a255d3b10e18a8a8a888b60405161147d959493929190612b22565b60405180910390a4809250505060016000819055509695505050505050565b600660009054906101000a90046fffffffffffffffffffffffffffffffff1681565b81600073ffffffffffffffffffffffffffffffffffffffff166008600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611564576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161155b90612903565b60405180910390fd5b60006008600085815260200190815260200160002090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461160d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160490612943565b60405180910390fd5b42816005015411611653576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164a90612923565b60405180910390fd5b828160070181905550837f95f83d4dfba2e4f3f99527a8e8a18980457125d95df460c1601811c0c961528f8460405161168c9190612ade565b60405180910390a250505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561184057600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d836040518263ffffffff1660e01b815260040161172a9190612ade565b600060405180830381600087803b15801561174457600080fd5b505af1158015611758573d6000803e3d6000fd5b505050506117668383611d1f565b61183b57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b1580156117d457600080fd5b505af11580156117e8573d6000803e3d6000fd5b505050505061183a8383600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611e0b9092919063ffffffff16565b5b61186c565b61186b83838373ffffffffffffffffffffffffffffffffffffffff16611e0b9092919063ffffffff16565b5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611970578134146118e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118df90612963565b60405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b15801561195257600080fd5b505af1158015611966573d6000803e3d6000fd5b5050505050611b14565b600081905060008173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016119b09190612707565b60206040518083038186803b1580156119c857600080fd5b505afa1580156119dc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a009190612281565b9050611a2f3330868573ffffffffffffffffffffffffffffffffffffffff16611e91909392919063ffffffff16565b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401611a6a9190612707565b60206040518083038186803b158015611a8257600080fd5b505afa158015611a96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aba9190612281565b905080611ad08684611f1a90919063ffffffff16565b14611b10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b0790612aa3565b60405180910390fd5b5050505b5050565b600060086000838152602001908152602001600020905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e308385600101546040518463ffffffff1660e01b8152600401611bbd93929190612722565b600060405180830381600087803b158015611bd757600080fd5b505af1158015611beb573d6000803e3d6000fd5b50505050827f28601d865dccc9f113e15a7185c1b38c085d598c71250d3337916a428536d77160405160405180910390a260086000848152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090556002820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556003820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560048201600090556005820160009055600682016000905560078201600090556008820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555050505050565b600081600001549050919050565b6001816000016000828254019250508190555050565b6000808373ffffffffffffffffffffffffffffffffffffffff1683600067ffffffffffffffff811115611d7b577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611dad5781602001600182028036833780820191505090505b50604051611dbb91906126db565b60006040518083038185875af1925050503d8060008114611df8576040519150601f19603f3d011682016040523d82523d6000602084013e611dfd565b606091505b505090508091505092915050565b611e8c8363a9059cbb60e01b8484604051602401611e2a929190612759565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611f30565b505050565b611f14846323b872dd60e01b858585604051602401611eb293929190612722565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611f30565b50505050565b60008183611f289190612ba7565b905092915050565b6000611f92826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611ff79092919063ffffffff16565b9050600081511115611ff25780806020019051810190611fb2919061222f565b611ff1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fe8906129c3565b60405180910390fd5b5b505050565b6060612006848460008561200f565b90509392505050565b606082471015612054576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204b906128c3565b60405180910390fd5b61205d85612123565b61209c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161209390612983565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516120c591906126db565b60006040518083038185875af1925050503d8060008114612102576040519150601f19603f3d011682016040523d82523d6000602084013e612107565b606091505b5091509150612117828286612136565b92505050949350505050565b600080823b905060008111915050919050565b6060831561214657829050612196565b6000835111156121595782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161218d9190612861565b60405180910390fd5b9392505050565b6000813590506121ac8161324d565b92915050565b6000815190506121c18161324d565b92915050565b6000815190506121d681613264565b92915050565b6000813590506121eb8161327b565b92915050565b6000815190506122008161327b565b92915050565b60006020828403121561221857600080fd5b6000612226848285016121b2565b91505092915050565b60006020828403121561224157600080fd5b600061224f848285016121c7565b91505092915050565b60006020828403121561226a57600080fd5b6000612278848285016121dc565b91505092915050565b60006020828403121561229357600080fd5b60006122a1848285016121f1565b91505092915050565b60008060008060008060c087890312156122c357600080fd5b60006122d189828a016121dc565b96505060206122e289828a0161219d565b95505060406122f389828a016121dc565b945050606061230489828a016121dc565b935050608061231589828a016121dc565b92505060a061232689828a0161219d565b9150509295509295509295565b6000806040838503121561234657600080fd5b6000612354858286016121dc565b9250506020612365858286016121dc565b9150509250929050565b61237881612cce565b82525050565b61238781612cbc565b82525050565b61239681612ce0565b82525050565b6123a581612cec565b82525050565b60006123b682612b75565b6123c08185612b8b565b93506123d0818560208601612d70565b80840191505092915050565b60006123e782612b80565b6123f18185612b96565b9350612401818560208601612d70565b61240a81612e01565b840191505092915050565b6000612422602183612b96565b915061242d82612e12565b604082019050919050565b6000612445602583612b96565b915061245082612e61565b604082019050919050565b6000612468602683612b96565b915061247382612eb0565b604082019050919050565b600061248b601f83612b96565b915061249682612eff565b602082019050919050565b60006124ae602183612b96565b91506124b982612f28565b604082019050919050565b60006124d1601b83612b96565b91506124dc82612f77565b602082019050919050565b60006124f4601783612b96565b91506124ff82612fa0565b602082019050919050565b6000612517603283612b96565b915061252282612fc9565b604082019050919050565b600061253a600083612b8b565b915061254582613018565b600082019050919050565b600061255d601d83612b96565b91506125688261301b565b602082019050919050565b6000612580601a83612b96565b915061258b82613044565b602082019050919050565b60006125a3602a83612b96565b91506125ae8261306d565b604082019050919050565b60006125c6601883612b96565b91506125d1826130bc565b602082019050919050565b60006125e9601f83612b96565b91506125f4826130e5565b602082019050919050565b600061260c600f83612b96565b91506126178261310e565b602082019050919050565b600061262f603083612b96565b915061263a82613137565b604082019050919050565b6000612652601783612b96565b915061265d82613186565b602082019050919050565b6000612675602f83612b96565b9150612680826131af565b604082019050919050565b6000612698603483612b96565b91506126a3826131fe565b604082019050919050565b6126b781612d18565b82525050565b6126c681612d5e565b82525050565b6126d581612d54565b82525050565b60006126e782846123ab565b915081905092915050565b60006126fd8261252d565b9150819050919050565b600060208201905061271c600083018461237e565b92915050565b6000606082019050612737600083018661237e565b612744602083018561237e565b61275160408301846126cc565b949350505050565b600060408201905061276e600083018561237e565b61277b60208301846126cc565b9392505050565b600061012082019050612798600083018c61237e565b6127a5602083018b6126cc565b6127b2604083018a61237e565b6127bf606083018961236f565b6127cc60808301886126cc565b6127d960a08301876126cc565b6127e660c08301866126cc565b6127f360e08301856126cc565b61280161010083018461237e565b9a9950505050505050505050565b6000606082019050612824600083018661237e565b61283160208301856126cc565b61283e604083018461238d565b949350505050565b600060208201905061285b600083018461239c565b92915050565b6000602082019050818103600083015261287b81846123dc565b905092915050565b6000602082019050818103600083015261289c81612415565b9050919050565b600060208201905081810360008301526128bc81612438565b9050919050565b600060208201905081810360008301526128dc8161245b565b9050919050565b600060208201905081810360008301526128fc8161247e565b9050919050565b6000602082019050818103600083015261291c816124a1565b9050919050565b6000602082019050818103600083015261293c816124c4565b9050919050565b6000602082019050818103600083015261295c816124e7565b9050919050565b6000602082019050818103600083015261297c8161250a565b9050919050565b6000602082019050818103600083015261299c81612550565b9050919050565b600060208201905081810360008301526129bc81612573565b9050919050565b600060208201905081810360008301526129dc81612596565b9050919050565b600060208201905081810360008301526129fc816125b9565b9050919050565b60006020820190508181036000830152612a1c816125dc565b9050919050565b60006020820190508181036000830152612a3c816125ff565b9050919050565b60006020820190508181036000830152612a5c81612622565b9050919050565b60006020820190508181036000830152612a7c81612645565b9050919050565b60006020820190508181036000830152612a9c81612668565b9050919050565b60006020820190508181036000830152612abc8161268b565b9050919050565b6000602082019050612ad860008301846126ae565b92915050565b6000602082019050612af360008301846126cc565b92915050565b6000604082019050612b0e60008301856126cc565b612b1b60208301846126bd565b9392505050565b600060a082019050612b3760008301886126cc565b612b4460208301876126cc565b612b5160408301866126cc565b612b5e606083018561237e565b612b6b608083018461237e565b9695505050505050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b6000612bb282612d54565b9150612bbd83612d54565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612bf257612bf1612da3565b5b828201905092915050565b6000612c0882612d54565b9150612c1383612d54565b925082612c2357612c22612dd2565b5b828204905092915050565b6000612c3982612d54565b9150612c4483612d54565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612c7d57612c7c612da3565b5b828202905092915050565b6000612c9382612d54565b9150612c9e83612d54565b925082821015612cb157612cb0612da3565b5b828203905092915050565b6000612cc782612d34565b9050919050565b6000612cd982612d34565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b60006fffffffffffffffffffffffffffffffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612d6982612d18565b9050919050565b60005b83811015612d8e578082015181840152602081019050612d73565b83811115612d9d576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f43616c6c6572206d757374206265206f776e657220666f7220746f6b656e206960008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b7f43616e206f6e6c792062652063616c6c65642062792061756374696f6e20637260008201527f6561746f72000000000000000000000000000000000000000000000000000000602082015250565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b7f4d7573742073656e64206174206c656173742072657365727665507269636500600082015250565b7f41756374696f6e206973206e6f74206578697374206f722066696e697368656460008201527f2100000000000000000000000000000000000000000000000000000000000000602082015250565b7f41756374696f6e2068617320616c726561647920737461727465640000000000600082015250565b7f4d7573742062652061756374696f6e2063726561746f72000000000000000000600082015250565b7f53656e74204554482056616c756520646f6573206e6f74206d6174636820737060008201527f656369666965642062696420616d6f756e740000000000000000000000000000602082015250565b50565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f5365727669636520466565207061796d656e74206661696c6564000000000000600082015250565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b7f41756374696f6e206861736e277420636f6d706c657465640000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b7f41756374696f6e20657870697265640000000000000000000000000000000000600082015250565b7f596f757220626964206d7573742062652067726561746572207468616e20686960008201527f67676573742062696420616d6f756e7400000000000000000000000000000000602082015250565b7f41756374696f6e206e6f74207374617274656420796574000000000000000000600082015250565b7f746f6b656e436f6e747261637420646f6573206e6f7420737570706f7274204560008201527f524337323120696e746572666163650000000000000000000000000000000000602082015250565b7f546f6b656e207472616e736665722063616c6c20646964206e6f74207472616e60008201527f7366657220657870656374656420616d6f756e74000000000000000000000000602082015250565b61325681612cbc565b811461326157600080fd5b50565b61326d81612ce0565b811461327857600080fd5b50565b61328481612d54565b811461328f57600080fd5b5056fea26469706673582212205ca1b8e355936c2f37d424dfc339a22174d878313ec3ab207259b82ebd456e7764736f6c63430008040033";

type RoniaMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RoniaMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RoniaMarket__factory extends ContractFactory {
  constructor(...args: RoniaMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _weth: string,
    _platformAccount: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RoniaMarket> {
    return super.deploy(
      _weth,
      _platformAccount,
      overrides || {}
    ) as Promise<RoniaMarket>;
  }
  getDeployTransaction(
    _weth: string,
    _platformAccount: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_weth, _platformAccount, overrides || {});
  }
  attach(address: string): RoniaMarket {
    return super.attach(address) as RoniaMarket;
  }
  connect(signer: Signer): RoniaMarket__factory {
    return super.connect(signer) as RoniaMarket__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoniaMarketInterface {
    return new utils.Interface(_abi) as RoniaMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoniaMarket {
    return new Contract(address, _abi, signerOrProvider) as RoniaMarket;
  }
}