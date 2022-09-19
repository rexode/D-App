// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmartContract is ERC721Enumerable, Ownable {
  using Strings for uint256;
  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.05 ether;
  uint256 public weiCentesimasEther=10000000000000000;
  uint256 public maxSupply = 1100;
  bool public paused = false;
  mapping(address => bool) public whitelisted;
  mapping(address => auction_winner) public Aucwhitelisted;
  struct auction_winner {
      bool active;
      address  winner;
      uint256 numeroNft;
      uint256 precio;
  }
  //auction_winner[] public winners;
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
    
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    for(int i=0;i<25;i++)
    {
    FirstMint(msg.sender);
    }
    for(int i=0;i<25;i++)
    {
    FirstMint(0xad1f11c7c621e628E47E164A87d97D5A048Cb2E5);
    }
  }

    
  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint() public payable {
    uint256 supply = totalSupply() + 100;
    require(!paused);
    require(supply + 1 <= maxSupply);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost);
        }
    }
      _safeMint(msg.sender, supply + 1);
  }
  function FirstMint(address _to) onlyOwner public  payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(supply + 1 <= maxSupply);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost);
        }
    }
      _safeMint(_to, supply + 1);
  }
  function mintAuction() public payable {
    require(!paused);
    require(Aucwhitelisted[msg.sender].active);
   // require(winners[msg.sender]==true);
    require(msg.value >= Aucwhitelisted[msg.sender].precio );
     _safeMint(msg.sender,Aucwhitelisted[msg.sender].numeroNft);
     Aucwhitelisted[msg.sender].active=false;
  }

    
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }
  function IsOwner(address owner) public view returns (bool boolean){
      return(balanceOf(owner)>0);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner() {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
  function whitelistAuctionWinner(address _user,uint256 nft,uint256 Pcost) public onlyOwner {
    Aucwhitelisted[_user] = auction_winner(true,_user,nft,Pcost*weiCentesimasEther);
  }
 
  function removeWhitelistAuct(address _user) public onlyOwner {
     Aucwhitelisted[_user].active=false;
  }
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }
  
  function setmaxSupply(uint256 newSupply) public onlyOwner{
      maxSupply=newSupply;
  }
  function balance() public view onlyOwner returns(uint256 accountBalance)
        {
            return address(this).balance/weiCentesimasEther;
        }

}