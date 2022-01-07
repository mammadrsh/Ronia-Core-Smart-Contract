//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRoniaMarket} from "./interfaces/IRoniaMarket.sol";
import {AuctionMarket} from "./AuctionMarket.sol";
import {BaseMarket} from "./BaseMarket.sol";

/**
 * @title Ronia Market Protocol contract
 */
contract RoniaMarket is IRoniaMarket, BaseMarket, AuctionMarket {


    constructor(address payable _platformAccount) BaseMarket(_platformAccount) {
        //
    }

}