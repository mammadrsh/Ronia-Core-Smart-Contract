// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//Royalties
//Uri and metadata
//Proxy
contract Ronia721 is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private tokenCounter;

    // Mapping from token id to creator address
    mapping(uint256 => address) public creators;

    address marketAddress;

    constructor(string memory _name, string memory _symbol, address _marketAddress) ERC721(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        marketAddress = _marketAddress;
    }

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }

    function mint(string memory _tokenURI) external returns(uint256) {
        tokenCounter.increment();
        uint256 tokenId = tokenCounter.current();

        _safeMint(_msgSender(), tokenId);
        _setCreator(_msgSender(), tokenId);
        _setTokenURI(tokenId, _tokenURI);
        setApprovalForAll(marketAddress, true);

        return tokenId;
    }

    function _setCreator(address _creator, uint256 _tokenId) private {
        creators[_tokenId] = _creator;
    }
}
