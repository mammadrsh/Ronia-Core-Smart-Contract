//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IBuyNowMarket} from "./interfaces/IBuyNowMarket.sol";
import {BaseMarket} from "./BaseMarket.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IERC721, IERC165} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Ronia Auction Market Protocol contract
 */
abstract contract BuyNowMarket is IBuyNowMarket, BaseMarket {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private itemIdCounter;

    // A mapping of all of the auctions currently running.
    mapping(uint256 => IBuyNowMarket.Item) public items;

    modifier _itemExists(uint256 _id) {
        require(
            items[_id].seller != payable(0),
            "Item is not exist or already purchased!"
        );
        _;
    }

    modifier _onlyOwner(uint256 _id) {
        require(msg.sender == items[_id].seller, "Must be Item creator");
        _;
    }

        modifier _notOwner(uint256 _id) {
        require(msg.sender != items[_id].seller, "Must not be Item creator");
        _;
    }

    function createItem(
        uint256 _tokenId,
        address _tokenContract,
        uint256 _reservePrice,
        address _currency
    )
        public
        override
        _isERC721(_tokenContract)
        _isERC721Owner(_tokenContract, _tokenId)
        nonReentrant
        returns (uint256)
    {
        address tokenOwner = IERC721(_tokenContract).ownerOf(_tokenId);
        uint256 itemId = itemIdCounter.current();

        items[itemId] = Item({
            seller: msg.sender,
            tokenId: _tokenId,
            tokenContract: _tokenContract,
            reservePrice: _reservePrice,
            currency: _currency
        });

        itemIdCounter.increment();

        emit BuyNowItemCreated(
            itemId,
            _tokenId,
            _tokenContract,
            _reservePrice,
            tokenOwner,
            _currency
        );

        return itemId;
    }

    function updateItem(uint256 _id, uint256 _reservePrice)
        public
        override
        _itemExists(_id)
        _onlyOwner(_id)
    {
        Item storage item = items[_id];
        item.reservePrice = _reservePrice;

        emit BuyNowItemUpdated(_id, _reservePrice);
    }

    function cancelItem(uint256 _id)
        public
        override
        _itemExists(_id)
        _onlyOwner(_id)
    {
        _cancelItem(_id);
    }

    function purchaseItem(uint256 _id)
        public
        payable
        override
        _itemExists(_id)
        _notOwner(_id)
        nonReentrant
    {
        Item storage item = items[_id];

        require(
            IERC20(item.currency).allowance(msg.sender, address(this)) >=
                item.reservePrice,
            "Bidder Should approve market for bid amount"
        );

        // Transfer the NFT token to the winner
        IERC721(item.tokenContract).safeTransferFrom(
            item.seller,
            msg.sender,
            item.tokenId
        );

        _fundPay(
            payable(msg.sender),
            payable(item.seller),
            item.reservePrice,
            item.currency
        );

        delete items[_id];

        emit BuyNowItemPurchased(_id, msg.sender, block.timestamp);
    }

    function _cancelItem(uint256 _id) internal {
        emit BuyNowItemCanceled(_id, block.timestamp);

        delete items[_id];
    }
}
