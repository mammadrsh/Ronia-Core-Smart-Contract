//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IAuctionMarket} from "./interfaces/IAuctionMarket.sol";
import {BaseMarket} from "./BaseMarket.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC721, IERC165} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Ronia Auction Market Protocol contract
 */
abstract contract AuctionMarket is IAuctionMarket, BaseMarket {
    using Counters for Counters.Counter;

    // To check with ERC165 if a token contract is ERC-721 standard
    bytes4 constant interfaceId = 0x80ac58cd; // ERC-721 interface id
    uint128 public extentionWindow = 15 minutes;
    Counters.Counter private auctionIdCounter;

    // A mapping of all of the auctions currently running.
    mapping(uint256 => IAuctionMarket.Auction) public auctions;

    modifier _auctionExists(uint256 _id) {
        require(
            auctions[_id].seller == payable(0),
            "Auction is not exist or finished!"
        );
        _;
    }

    /**
     * @notice Create an auction.
     * @dev Store the auction details in the auctions mapping and emit an AuctionCreated event.
     * Check for _auctionCurrency to be ERC20
     * Check tokenId exitst!
     */
    function createAuction(
        uint256 _tokenId,
        address _tokenContract,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _reservePrice,
        address _auctionCurrency
    ) public override nonReentrant returns (uint256) {
        require(
            IERC165(_tokenContract).supportsInterface(interfaceId),
            "tokenContract does not support ERC721 interface"
        );

        address tokenOwner = IERC721(_tokenContract).ownerOf(_tokenId);
        require(msg.sender == tokenOwner, "Caller must be owner for token id");
        uint256 auctionId = auctionIdCounter.current();

        auctions[auctionId] = Auction({
            seller: msg.sender,
            tokenId: _tokenId,
            tokenContract: _tokenContract,
            bid: 0,
            bidder: payable(0),
            startTime: _startTime,
            endTime: _endTime,
            reservePrice: _reservePrice,
            auctionCurrency: _auctionCurrency
        });

        IERC721(_tokenContract).transferFrom(
            tokenOwner,
            address(this),
            _tokenId
        );

        auctionIdCounter.increment();

        emit AuctionCreated(
            auctionId,
            _tokenId,
            _tokenContract,
            _startTime,
            _endTime,
            _reservePrice,
            tokenOwner,
            _auctionCurrency
        );

        return auctionId;
    }

    /**
     * @notice Place a bid on an Auction, with a given amount.
     * @dev If provided a valid bid, transfers the provided amount to this contract.
     * If the auction is run in native ETH, the ETH is wrapped so it can be identically to other
     * auction currencies in this contract.
     */
    function placeBid(uint256 _id, uint256 _amount)
        external
        payable
        override
        _auctionExists(_id)
        nonReentrant
    {
        Auction storage auction = auctions[_id];
        address payable lastBidder = auctions[_id].bidder;
        require(auction.reservePrice > 0, "Must send at least reservePrice");
        require(
            block.timestamp >= auction.startTime,
            "Auction not started yet"
        );
        require(block.timestamp < auction.endTime, "Auction expired");
        require(
            _amount >= auction.bid,
            "Your bid must be greater than higgest bid amount"
        );
        require(
            _amount >= auction.reservePrice,
            "Must send at least reservePrice"
        );

        if (lastBidder != address(0)) {
            //Transfer Bid to last Bidder
            _fundPay(lastBidder, auction.bid, auction.auctionCurrency);
        }

        // Transfer Bid amount to this contract
        _fundRecieve(_amount, auction.auctionCurrency);

        auction.bid = _amount;
        auction.bidder = payable(msg.sender);

        // Check in case of extend
        bool extended = false;
        if (auction.endTime - block.timestamp <= extentionWindow) {
            auction.endTime = auction.endTime + extentionWindow;
            extended = true;
        }

        emit AuctionBided(
            _id,
            msg.sender,
            _amount,
            extended
        );

        if (extended) {
            emit AuctionDurationExtended(
                _id,
                auction.endTime,
                extentionWindow
            );
        }
    }

    /**
     * @notice update Auction price.
     * @dev If auction exits, and if the reserve price has not been met.
     * Only Auction owner.
     * Only reserve price for now.
     */
    function updateAuction(uint256 _id, uint256 _reservePrice)
        external
        override
        _auctionExists(_id)
    {
        Auction storage auction = auctions[_id];
        require(msg.sender == auction.seller, "Must be auction creator");
        require(
            auction.startTime > block.timestamp,
            "Auction has already started"
        );

        auction.reservePrice = _reservePrice;

        emit AuctionUpdated(_id, _reservePrice);
    }

    /**
     * @notice Cancel an auction.
     * @dev Transfers the NFT back to the auction creator and emits an AuctionCanceled event
     * Only if Auction exists, has no bidder.
     */
    function cancelAuction(uint256 _id) external override _auctionExists(_id) {
        Auction storage auction = auctions[_id];
        require(
            auction.seller == msg.sender,
            "Can only be called by auction creator"
        );
        require(auction.bid == 0, "Auction has a bidder");
        _cancelAuction(_id);
    }

    /**
     * @notice End an auction, finalizing the bid if applicable and paying out the respective parties.
     * Pay NFT to the winner, pay market serviceFee, pay royalties to the NFT creator, pay bid to the seller
     * @dev If for some reason the auction cannot be finalized (invalid token recipient, for example),
     * The auction is reset and the NFT is transferred back to the auction creator.
     * Note anyone can result the action as only the winner and seller are compensated
     */
    function endAuction(uint256 _id)
        external
        override
        _auctionExists(_id)
        nonReentrant
    {
        Auction storage auction = auctions[_id];
        require(auction.endTime > block.timestamp, "Auction hasn't completed");

        address winner = auction.bidder;
        address seller = auction.seller;
        uint256 winningBid = auction.bid;

        // Transfer the NFT token to the winner
        IERC721(auction.tokenContract).safeTransferFrom(
            address(this),
            winner,
            auction.tokenId
        );

        // Pay royalties to NFT token owner
        // (address _royaltyRecipient, uint256 _royaltyAmount) = koda.royaltyInfo(
        //     auction.tokenId,
        //     _paymentAmount
        // );

        // Pay market serviceFee
        // pay platform fee
        uint256 roniaFee = (winningBid / modulo) * serviceFee;
        (bool serviceFeeSuccess, ) = platformAccount.call{value: roniaFee}("");
        require(serviceFeeSuccess, "Service Fee payment failed");

        // Pay the seller
        _fundPay(payable(seller), auction.bid, auction.auctionCurrency);

        delete auctions[_id];

        emit AuctionEnded(_id, winner, winningBid);
    }

    function _cancelAuction(uint256 _id) internal {
        Auction storage auction = auctions[_id];
        address tokenOwner = auction.seller;
        IERC721(auction.tokenContract).safeTransferFrom(
            address(this),
            tokenOwner,
            auction.tokenId
        );

        emit AuctionCanceled(_id);

        delete auctions[_id];
    }
}
