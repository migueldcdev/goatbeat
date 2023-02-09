import { Injectable } from '@angular/core';
import Web3 from 'web3';
import axios from 'axios';
import contractABI from '../contract/abi.json'


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  
  address:string = '0x880681d6851045b066b9576f6A8E9b1071BFaf15'
  web3: any
  contract: any  
  baseUrl = "https://gateway.pinata.cloud" //ipfs has limited request number so changed to pinata gateway
  
  constructor() { 
    this.web3 = new Web3('https://goerli.infura.io/v3/6c596dcdad2847e581e3a8f3d46090a9');
    this.contract = new  this.web3.eth.Contract(contractABI, this.address);
  }


  async getTotalSuply() {
    const totalSuply = await this.contract.methods.totalSuply().call()    
    return totalSuply
  }

  async tokenCreator(tokenId: number) {
    const ownerOf = await this.contract.methods.tokenCreator(tokenId).call() 
    
    return ownerOf
  } 

  async getTokenUri(tokenId: number) {
    let tokenUri = await this.contract.methods.tokenURI(tokenId).call();
    tokenUri = new URL(tokenUri).pathname   
    
    return this.baseUrl + tokenUri
  }


  async getTokenPriceInWei(tokenId: number) {
    const tokenPrice = await this.contract.methods.tokenPrice(tokenId).call()
    return tokenPrice
  }

  async getTokenPriceInEther(tokenId: number) {
    const tokenPrice = await this.contract.methods.tokenPrice(tokenId).call()
    return Web3.utils.fromWei(tokenPrice, 'ether')
  }

  async getTokenData(uri: string) {    
    let tokenData

    await axios.get(uri).then(res => {      
      tokenData = res.data
      let tokenUri = new URL(res.data.audio).pathname
      tokenData.audio = tokenUri
    })    
    
    return tokenData   

  }

  async getTokenOwner(tokenId: number) {
    const tokenOwner = await this.contract.methods.ownerOf(tokenId).call()
    return tokenOwner
  }

  async createTokenList(address: string) {
    const tokenList = []
    const totalSuply = await this.getTotalSuply()

    for(let i=1; i <= totalSuply; i++) {      
      const creatorAddress = await this.tokenCreator(i)      

      if(Web3.utils.toChecksumAddress(address) == creatorAddress) {        
        const tokenUri = await this.getTokenUri(i)       

        const tokenInfo = {
          "tokenId": i,
          "tokenUri": await this.getTokenData(tokenUri),
          "tokenPriceWei": await this.getTokenPriceInWei(i),
          "tokenPriceEther": await this.getTokenPriceInEther(i),  
          "tokenOwner": await this.getTokenOwner(i)
        }

        tokenList.push(tokenInfo)

      }
    }
    
    return tokenList
  }



}
