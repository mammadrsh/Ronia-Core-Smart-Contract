/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BaseMarketInterface extends utils.Interface {
  functions: {
    "approveScale()": FunctionFragment;
    "getPlatformAccount()": FunctionFragment;
    "modulo()": FunctionFragment;
    "platformAccount()": FunctionFragment;
    "roniaAddress()": FunctionFragment;
    "serviceFee()": FunctionFragment;
    "setPlatformAccount(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approveScale",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlatformAccount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "modulo", values?: undefined): string;
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

  decodeFunctionResult(
    functionFragment: "approveScale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPlatformAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "modulo", data: BytesLike): Result;
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

  events: {};
}

export interface BaseMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseMarketInterface;

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

    getPlatformAccount(overrides?: CallOverrides): Promise<[string]>;

    modulo(overrides?: CallOverrides): Promise<[BigNumber]>;

    platformAccount(overrides?: CallOverrides): Promise<[string]>;

    roniaAddress(overrides?: CallOverrides): Promise<[string]>;

    serviceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approveScale(overrides?: CallOverrides): Promise<BigNumber>;

  getPlatformAccount(overrides?: CallOverrides): Promise<string>;

  modulo(overrides?: CallOverrides): Promise<BigNumber>;

  platformAccount(overrides?: CallOverrides): Promise<string>;

  roniaAddress(overrides?: CallOverrides): Promise<string>;

  serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

  setPlatformAccount(
    _platformAccount: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveScale(overrides?: CallOverrides): Promise<BigNumber>;

    getPlatformAccount(overrides?: CallOverrides): Promise<string>;

    modulo(overrides?: CallOverrides): Promise<BigNumber>;

    platformAccount(overrides?: CallOverrides): Promise<string>;

    roniaAddress(overrides?: CallOverrides): Promise<string>;

    serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    approveScale(overrides?: CallOverrides): Promise<BigNumber>;

    getPlatformAccount(overrides?: CallOverrides): Promise<BigNumber>;

    modulo(overrides?: CallOverrides): Promise<BigNumber>;

    platformAccount(overrides?: CallOverrides): Promise<BigNumber>;

    roniaAddress(overrides?: CallOverrides): Promise<BigNumber>;

    serviceFee(overrides?: CallOverrides): Promise<BigNumber>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveScale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPlatformAccount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    modulo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    platformAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    roniaAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    serviceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPlatformAccount(
      _platformAccount: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
