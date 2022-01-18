//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Ronia Auction Market Protocol interface
 */
interface IAuctionMarket {
    struct Auction {
        // The address that should receive the funds once the NFT is sold.
        address seller;
        // ID for the ERC721 token
        uint256 tokenId;
        // Address for the ERC721 contract
        address tokenContract;
        // The current highest bid address
        address payable bidder;
        // The current highest bid amount
        uint256 bid;
        // The time auction starts
        uint256 startTime;
        // The time auction ends
        uint256 endTime;
        // The minimum price of the first bid
        uint256 reservePrice;
        // If set to 0x0, the auction will be run in ETH
        address auctionCurrency;
    }

    event AuctionCreated(
        uint256 indexed auctionId,
        uint256 indexed tokenId,
        address indexed tokenContract,
        uint256 startTime,
        uint256 endTime,
        uint256 reservePrice,
        address seller,
        address auctionCurrency
    );

    event AuctionBidded(
        uint256 indexed auctionId,
        address sender,
        uint256 amount,
        bool extended
    );

    event AuctionDurationExtended(
        uint256 indexed auctionId,
        uint256 newEndTime,
        uint256 duration
    );

    event AuctionUpdated(uint256 indexed auctionId, uint256 reservePrice);

    event AuctionCanceled(uint256 indexed auctionId, uint256 canceledAt);

    event AuctionEnded(
        uint256 indexed auctionId,
        address winner,
        uint256 amount,
        uint256 endedAt
    );

    function createAuction(
        uint256 tokenId,
        address tokenContract,
        uint256 startTime,
        uint256 endTime,
        uint256 reservePrice,
        address auctionCurrency
    ) external returns (uint256);

    function placeBid(uint256 auctionId, uint256 amount) external payable;

    function updateAuction(uint256 auctionId, uint256 reservePrice) external;

    function cancelAuction(uint256 auctionId) external;

    function endAuction(uint256 auctionId) external;
}
