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
    uint256 public serviceFee = 2_50000; // 2.50000%
    // @notice precision 100.00000%
    uint256 public modulo = 100_00000; // 100.00000%

    // / The address of the WETH contract, so that any ETH transferred can be handled as an ERC-20
    address public roniaAddress;
    address public wethAddress;
    // @notice platform funds collector
    address payable public platformAccount;

    constructor(address _weth, address payable _platformAccount) {
        wethAddress = _weth;
        platformAccount = _platformAccount;
    }

    function getPlatformAccount() public view returns (address payable) {
        return platformAccount;
    }

    function setPlatformAccount(address payable _platformAccount) public {
        platformAccount = _platformAccount;
    }

    function getWethAddress() public view returns (address) {
        return wethAddress;
    }

    function setWethAddress(address payable _wethAddress) public {
        wethAddress = _wethAddress;
    }

    function _fundPay(
        address payable to,
        uint256 amount,
        address currency
    ) internal {
        // If the auction is in ETH, unwrap it from its underlying WETH and try to send it to the recipient.
        if (currency == address(0)) {
            IWETH(wethAddress).withdraw(amount);

            // If the ETH transfer fails (sigh), rewrap the ETH and try send it as WETH.
            if (!_safeTransferETH(to, amount)) {
                IWETH(wethAddress).deposit{value: amount}();
                IERC20(wethAddress).safeTransfer(to, amount);
            }
        } else {
            IERC20(currency).safeTransfer(to, amount);
        }
    }

    function _safeTransferETH(address to, uint256 value)
        internal
        returns (bool)
    {
        (bool success, ) = to.call{value: value}(new bytes(0));
        return success;
    }

    /**
     * @dev Given an amount and a currency, transfer the currency to this contract.
     * If the currency is ETH (0x0), attempt to wrap the amount as WETH
     */
    function _fundRecieve(uint256 amount, address currency) internal {
        // If this is an ETH bid, ensure they sent enough and convert it to WETH under the hood
        if (currency == address(0)) {
            require(
                msg.value == amount,
                "Sent ETH Value does not match specified bid amount"
            );
            IWETH(wethAddress).deposit{value: amount}();
        } else {
            // We must check the balance that was actually transferred to the auction,
            // as some tokens impose a transfer fee and would not actually transfer the
            // full amount to the market, resulting in potentally locked funds
            IERC20 token = IERC20(currency);
            uint256 beforeBalance = token.balanceOf(address(this));
            token.safeTransferFrom(msg.sender, address(this), amount);
            uint256 afterBalance = token.balanceOf(address(this));
            require(
                beforeBalance.add(amount) == afterBalance,
                "Token transfer call did not transfer expected amount"
            );
        }
    }
}
