//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IWETH} from "./interfaces/IWETH.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

abstract contract BaseMarket is ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    /// @notice Ronia commission on every sale
    uint256 public serviceFee = 2_00000; // 2.50000%
    /// @notice Approve amount scale
    uint256 public approveScale = 5_00000; // 5.00000%
    /// @notice precision 100.00000%
    uint256 public modulo = 100_00000; // 100.00000%


    address public roniaAddress;
    // @notice platform funds collector
    address payable public platformAccount;

    constructor(address payable _platformAccount) {
        platformAccount = _platformAccount;
    }

    function getPlatformAccount() public view returns (address payable) {
        return platformAccount;
    }

    function setPlatformAccount(address payable _platformAccount) public {
        platformAccount = _platformAccount;
    }

    function _fundPay(
        address payable _from,
        address payable _to,
        uint256 _amount,
        address _currency
    ) internal {
        uint256 roniaFee = (_amount.div(modulo)).mul(serviceFee);
        uint256 sellerRecieveAmount = _amount - roniaFee;

        // Pay market serviceFee
        IERC20(_currency).transferFrom(_from, platformAccount, roniaFee);
        IERC20(_currency).transferFrom(_from, _to, sellerRecieveAmount);
    }

    function _safeTransferETH(address to, uint256 value)
        internal
        returns (bool)
    {
        (bool success, ) = to.call{value: value}(new bytes(0));
        return success;
    }

    /**
     * @dev Given an amount and a currency, approve the currency to this contract.
     */
    function _approveFunds(uint256 _amount, address _currency) internal {
        // We must check the balance that was actually transferred to the auction,
        // as some tokens impose a transfer fee and would not actually transfer the
        // full amount to the market, resulting in potentally locked funds
        // add 5% to the approve in case of transfer fee
        IERC20 token = IERC20(_currency);
        uint256 balance = token.balanceOf(msg.sender);
        uint256 approveAmount = _amount * (approveScale / modulo);
        require(balance > approveAmount, "User does not have enought balance.");
        token.approve(address(this), approveAmount);
    }
}
