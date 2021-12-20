/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IAuctionMarketInterface extends utils.Interface {
  functions: {
    "cancelAuction(uint256)": FunctionFragment;
    "createAuction(uint256,address,uint256,uint256,uint256,address)": FunctionFragment;
    "endAuction(uint256)": FunctionFragment;
    "placeBid(uint256,uint256)": FunctionFragment;
    "updateAuction(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cancelAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "endAuction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBid",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAuction",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endAuction", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateAuction",
    data: BytesLike
  ): Result;

  events: {
    "AuctionBided(uint256,uint256,address,address,uint256,bool)": EventFragment;
    "AuctionCanceled(uint256)": EventFragment;
    "AuctionCreated(uint256,uint256,address,uint256,uint256,uint256,address,address)": EventFragment;
    "AuctionDurationExtended(uint256,uint256,address,uint256,uint256)": EventFragment;
    "AuctionEnded(uint256,address,uint256)": EventFragment;
    "AuctionUpdated(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionBided"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionDurationExtended"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionUpdated"): EventFragment;
}

export type AuctionBidedEvent = TypedEvent<
  [BigNumber, BigNumber, string, string, BigNumber, boolean],
  {
    auctionId: BigNumber;
    tokenId: BigNumber;
    tokenContract: string;
    sender: string;
    value: BigNumber;
    extended: boolean;
  }
>;

export type AuctionBidedEventFilter = TypedEventFilter<AuctionBidedEvent>;

export type AuctionCanceledEvent = TypedEvent<
  [BigNumber],
  { auctionId: BigNumber }
>;

export type AuctionCanceledEventFilter = TypedEventFilter<AuctionCanceledEvent>;

export type AuctionCreatedEvent = TypedEvent<
  [
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string
  ],
  {
    auctionId: BigNumber;
    tokenId: BigNumber;
    tokenContract: string;
    startTime: BigNumber;
    endTime: BigNumber;
    reservePrice: BigNumber;
    tokenOwner: string;
    auctionCurrency: string;
  }
>;

export type AuctionCreatedEventFilter = TypedEventFilter<AuctionCreatedEvent>;

export type AuctionDurationExtendedEvent = TypedEvent<
  [BigNumber, BigNumber, string, BigNumber, BigNumber],
  {
    auctionId: BigNumber;
    tokenId: BigNumber;
    tokenContract: string;
    newEndTime: BigNumber;
    duration: BigNumber;
  }
>;

export type AuctionDurationExtendedEventFilter =
  TypedEventFilter<AuctionDurationExtendedEvent>;

export type AuctionEndedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  { auctionId: BigNumber; winner: string; amount: BigNumber }
>;

export type AuctionEndedEventFilter = TypedEventFilter<AuctionEndedEvent>;

export type AuctionUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { auctionId: BigNumber; reservePrice: BigNumber }
>;

export type AuctionUpdatedEventFilter = TypedEventFilter<AuctionUpdatedEvent>;

export interface IAuctionMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAuctionMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      startTime: BigNumberish,
      endTime: BigNumberish,
      reservePrice: BigNumberish,
      auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    placeBid(
      auctionId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateAuction(
      auctionId: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  cancelAuction(
    auctionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createAuction(
    tokenId: BigNumberish,
    tokenContract: string,
    startTime: BigNumberish,
    endTime: BigNumberish,
    reservePrice: BigNumberish,
    auctionCurrency: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endAuction(
    auctionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  placeBid(
    auctionId: BigNumberish,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateAuction(
    auctionId: BigNumberish,
    reservePrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      startTime: BigNumberish,
      endTime: BigNumberish,
      reservePrice: BigNumberish,
      auctionCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    endAuction(
      auctionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    placeBid(
      auctionId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAuction(
      auctionId: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AuctionBided(uint256,uint256,address,address,uint256,bool)"(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      sender?: null,
      value?: null,
      extended?: null
    ): AuctionBidedEventFilter;
    AuctionBided(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      sender?: null,
      value?: null,
      extended?: null
    ): AuctionBidedEventFilter;

    "AuctionCanceled(uint256)"(
      auctionId?: BigNumberish | null
    ): AuctionCanceledEventFilter;
    AuctionCanceled(
      auctionId?: BigNumberish | null
    ): AuctionCanceledEventFilter;

    "AuctionCreated(uint256,uint256,address,uint256,uint256,uint256,address,address)"(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      startTime?: null,
      endTime?: null,
      reservePrice?: null,
      tokenOwner?: null,
      auctionCurrency?: null
    ): AuctionCreatedEventFilter;
    AuctionCreated(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      startTime?: null,
      endTime?: null,
      reservePrice?: null,
      tokenOwner?: null,
      auctionCurrency?: null
    ): AuctionCreatedEventFilter;

    "AuctionDurationExtended(uint256,uint256,address,uint256,uint256)"(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      newEndTime?: null,
      duration?: null
    ): AuctionDurationExtendedEventFilter;
    AuctionDurationExtended(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      newEndTime?: null,
      duration?: null
    ): AuctionDurationExtendedEventFilter;

    "AuctionEnded(uint256,address,uint256)"(
      auctionId?: BigNumberish | null,
      winner?: null,
      amount?: null
    ): AuctionEndedEventFilter;
    AuctionEnded(
      auctionId?: BigNumberish | null,
      winner?: null,
      amount?: null
    ): AuctionEndedEventFilter;

    "AuctionUpdated(uint256,uint256)"(
      auctionId?: BigNumberish | null,
      reservePrice?: null
    ): AuctionUpdatedEventFilter;
    AuctionUpdated(
      auctionId?: BigNumberish | null,
      reservePrice?: null
    ): AuctionUpdatedEventFilter;
  };

  estimateGas: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      startTime: BigNumberish,
      endTime: BigNumberish,
      reservePrice: BigNumberish,
      auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    placeBid(
      auctionId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateAuction(
      auctionId: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createAuction(
      tokenId: BigNumberish,
      tokenContract: string,
      startTime: BigNumberish,
      endTime: BigNumberish,
      reservePrice: BigNumberish,
      auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endAuction(
      auctionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    placeBid(
      auctionId: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateAuction(
      auctionId: BigNumberish,
      reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}