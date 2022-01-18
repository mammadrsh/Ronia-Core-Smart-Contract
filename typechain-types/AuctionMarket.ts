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

export interface AuctionMarketInterface extends utils.Interface {
  functions: {
    "approveScale()": FunctionFragment;
    "auctions(uint256)": FunctionFragment;
    "cancelAuction(uint256)": FunctionFragment;
    "createAuction(uint256,address,uint256,uint256,uint256,address)": FunctionFragment;
    "endAuction(uint256)": FunctionFragment;
    "extentionWindow()": FunctionFragment;
    "getPlatformAccount()": FunctionFragment;
    "minBidIncrementPercentage()": FunctionFragment;
    "modulo()": FunctionFragment;
    "placeBid(uint256,uint256)": FunctionFragment;
    "platformAccount()": FunctionFragment;
    "roniaAddress()": FunctionFragment;
    "serviceFee()": FunctionFragment;
    "setPlatformAccount(address)": FunctionFragment;
    "updateAuction(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approveScale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "auctions",
    values: [BigNumberish]
  ): string;
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
    functionFragment: "extentionWindow",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatformAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minBidIncrementPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "modulo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "placeBid",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "platformAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "roniaAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "serviceFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPlatformAccount",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAuction",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveScale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "auctions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endAuction", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "extentionWindow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatformAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minBidIncrementPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "modulo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "platformAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "roniaAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "serviceFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPlatformAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAuction",
    data: BytesLike
  ): Result;

  events: {
    "AuctionBidded(uint256,address,uint256,bool)": EventFragment;
    "AuctionCanceled(uint256,uint256)": EventFragment;
    "AuctionCreated(uint256,uint256,address,uint256,uint256,uint256,address,address)": EventFragment;
    "AuctionDurationExtended(uint256,uint256,uint256)": EventFragment;
    "AuctionEnded(uint256,address,uint256,uint256)": EventFragment;
    "AuctionUpdated(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionBidded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionDurationExtended"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionUpdated"): EventFragment;
}

export type AuctionBiddedEvent = TypedEvent<
  [BigNumber, string, BigNumber, boolean],
  { auctionId: BigNumber; sender: string; amount: BigNumber; extended: boolean }
>;

export type AuctionBiddedEventFilter = TypedEventFilter<AuctionBiddedEvent>;

export type AuctionCanceledEvent = TypedEvent<
  [BigNumber, BigNumber],
  { auctionId: BigNumber; canceledAt: BigNumber }
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
    seller: string;
    auctionCurrency: string;
  }
>;

export type AuctionCreatedEventFilter = TypedEventFilter<AuctionCreatedEvent>;

export type AuctionDurationExtendedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { auctionId: BigNumber; newEndTime: BigNumber; duration: BigNumber }
>;

export type AuctionDurationExtendedEventFilter =
  TypedEventFilter<AuctionDurationExtendedEvent>;

export type AuctionEndedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  {
    auctionId: BigNumber;
    winner: string;
    amount: BigNumber;
    endedAt: BigNumber;
  }
>;

export type AuctionEndedEventFilter = TypedEventFilter<AuctionEndedEvent>;

export type AuctionUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { auctionId: BigNumber; reservePrice: BigNumber }
>;

export type AuctionUpdatedEventFilter = TypedEventFilter<AuctionUpdatedEvent>;

export interface AuctionMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AuctionMarketInterface;

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
    approveScale(overrides?: CallOverrides): Promise<[BigNumber]>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string
      ] & {
        seller: string;
        tokenId: BigNumber;
        tokenContract: string;
        bidder: string;
        bid: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        reservePrice: BigNumber;
        auctionCurrency: string;
      }
    >;

    cancelAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createAuction(
      _tokenId: BigNumberish,
      _tokenContract: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _reservePrice: BigNumberish,
      _auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    extentionWindow(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPlatformAccount(overrides?: CallOverrides): Promise<[string]>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    modulo(overrides?: CallOverrides): Promise<[BigNumber]>;

    placeBid(
      _id: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    platformAccount(overrides?: CallOverrides): Promise<[string]>;

    roniaAddress(overrides?: CallOverrides): Promise<[string]>;

    serviceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateAuction(
      _id: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approveScale(overrides?: CallOverrides): Promise<BigNumber>;

  auctions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      BigNumber,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      string
    ] & {
      seller: string;
      tokenId: BigNumber;
      tokenContract: string;
      bidder: string;
      bid: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
      reservePrice: BigNumber;
      auctionCurrency: string;
    }
  >;

  cancelAuction(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createAuction(
    _tokenId: BigNumberish,
    _tokenContract: string,
    _startTime: BigNumberish,
    _endTime: BigNumberish,
    _reservePrice: BigNumberish,
    _auctionCurrency: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endAuction(
    _id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  extentionWindow(overrides?: CallOverrides): Promise<BigNumber>;

  getPlatformAccount(overrides?: CallOverrides): Promise<string>;

  minBidIncrementPercentage(overrides?: CallOverrides): Promise<BigNumber>;

  modulo(overrides?: CallOverrides): Promise<BigNumber>;

  placeBid(
    _id: BigNumberish,
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  platformAccount(overrides?: CallOverrides): Promise<string>;

  roniaAddress(overrides?: CallOverrides): Promise<string>;

  serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

  setPlatformAccount(
    _platformAccount: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateAuction(
    _id: BigNumberish,
    _reservePrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveScale(overrides?: CallOverrides): Promise<BigNumber>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        BigNumber,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string
      ] & {
        seller: string;
        tokenId: BigNumber;
        tokenContract: string;
        bidder: string;
        bid: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        reservePrice: BigNumber;
        auctionCurrency: string;
      }
    >;

    cancelAuction(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    createAuction(
      _tokenId: BigNumberish,
      _tokenContract: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _reservePrice: BigNumberish,
      _auctionCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    endAuction(_id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    extentionWindow(overrides?: CallOverrides): Promise<BigNumber>;

    getPlatformAccount(overrides?: CallOverrides): Promise<string>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    modulo(overrides?: CallOverrides): Promise<BigNumber>;

    placeBid(
      _id: BigNumberish,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    platformAccount(overrides?: CallOverrides): Promise<string>;

    roniaAddress(overrides?: CallOverrides): Promise<string>;

    serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAuction(
      _id: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AuctionBidded(uint256,address,uint256,bool)"(
      auctionId?: BigNumberish | null,
      sender?: null,
      amount?: null,
      extended?: null
    ): AuctionBiddedEventFilter;
    AuctionBidded(
      auctionId?: BigNumberish | null,
      sender?: null,
      amount?: null,
      extended?: null
    ): AuctionBiddedEventFilter;

    "AuctionCanceled(uint256,uint256)"(
      auctionId?: BigNumberish | null,
      canceledAt?: null
    ): AuctionCanceledEventFilter;
    AuctionCanceled(
      auctionId?: BigNumberish | null,
      canceledAt?: null
    ): AuctionCanceledEventFilter;

    "AuctionCreated(uint256,uint256,address,uint256,uint256,uint256,address,address)"(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      startTime?: null,
      endTime?: null,
      reservePrice?: null,
      seller?: null,
      auctionCurrency?: null
    ): AuctionCreatedEventFilter;
    AuctionCreated(
      auctionId?: BigNumberish | null,
      tokenId?: BigNumberish | null,
      tokenContract?: string | null,
      startTime?: null,
      endTime?: null,
      reservePrice?: null,
      seller?: null,
      auctionCurrency?: null
    ): AuctionCreatedEventFilter;

    "AuctionDurationExtended(uint256,uint256,uint256)"(
      auctionId?: BigNumberish | null,
      newEndTime?: null,
      duration?: null
    ): AuctionDurationExtendedEventFilter;
    AuctionDurationExtended(
      auctionId?: BigNumberish | null,
      newEndTime?: null,
      duration?: null
    ): AuctionDurationExtendedEventFilter;

    "AuctionEnded(uint256,address,uint256,uint256)"(
      auctionId?: BigNumberish | null,
      winner?: null,
      amount?: null,
      endedAt?: null
    ): AuctionEndedEventFilter;
    AuctionEnded(
      auctionId?: BigNumberish | null,
      winner?: null,
      amount?: null,
      endedAt?: null
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
    approveScale(overrides?: CallOverrides): Promise<BigNumber>;

    auctions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    cancelAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createAuction(
      _tokenId: BigNumberish,
      _tokenContract: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _reservePrice: BigNumberish,
      _auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    extentionWindow(overrides?: CallOverrides): Promise<BigNumber>;

    getPlatformAccount(overrides?: CallOverrides): Promise<BigNumber>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    modulo(overrides?: CallOverrides): Promise<BigNumber>;

    placeBid(
      _id: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    platformAccount(overrides?: CallOverrides): Promise<BigNumber>;

    roniaAddress(overrides?: CallOverrides): Promise<BigNumber>;

    serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateAuction(
      _id: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveScale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    auctions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createAuction(
      _tokenId: BigNumberish,
      _tokenContract: string,
      _startTime: BigNumberish,
      _endTime: BigNumberish,
      _reservePrice: BigNumberish,
      _auctionCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endAuction(
      _id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    extentionWindow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPlatformAccount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minBidIncrementPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    modulo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    placeBid(
      _id: BigNumberish,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    platformAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    roniaAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    serviceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateAuction(
      _id: BigNumberish,
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
