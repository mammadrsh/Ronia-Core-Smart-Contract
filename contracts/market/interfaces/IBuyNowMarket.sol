//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Ronia Auction Market Protocol interface
 */
interface IBuyNowMarket {
    struct Item {
        // The address that should receive the funds once the NFT is sold.
        address seller;
        // ID for the ERC721 token
        uint256 tokenId;
        // Address for the ERC721 contract
        address tokenContract;
        // The price of the item
        uint256 reservePrice;
        // If set to 0x0, the auction will be run in ETH
        address currency;
    }

    event BuyNowItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address indexed tokenContract,
        uint256 reservePrice,
        address seller,
        address currency
    );

    event BuyNowItemUpdated(uint256 indexed itemId, uint256 reservePrice);

    event BuyNowItemCanceled(uint256 indexed itemId, uint256 canceledAt);

    event BuyNowItemPurchased(
        uint256 indexed itemId,
        address winner,
        uint256 purchasedAt
    );

    function createItem(
        uint256 tokenId,
        address tokenContract,
        uint256 reservePrice,
        address currency
    ) external returns (uint256);

    function updateItem(uint256 itemId, uint256 reservePrice) external;

    function cancelItem(uint256 itemId) external;

    function purchaseItem(uint256 itemId) external payable;
}
