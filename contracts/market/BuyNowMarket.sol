//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IBuyNowMarket} from "./interfaces/IBuyNowMarket.sol";
import {BaseMarket} from "./BaseMarket.sol";

/**
 * @title Ronia Auction Market Protocol contract
 */
abstract contract AuctionMarket is IBuyNowMarket, BaseMarket {

}