import { Inject, Injectable } from '@angular/core'
import Web3 from 'web3'
import { DOCUMENT } from '@angular/common';
import contractABI from '../contract/abi.json'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  window: any 
  contractAddress:string = '0x880681d6851045b066b9576f6A8E9b1071BFaf15'
  web3: any
  contract: any
  data!: any

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.window = document.defaultView
    this.web3 =  new Web3(this.window.ethereum)
    this.contract = new this.web3.eth.Contract(contractABI, this.contractAddress)
  }


  async mintNft(address:string,tokenUri:string, tokenPrice:number) {    
    this.contract.methods.mintNFT(tokenUri, tokenPrice).send({from: address})
     .then((receipt:any) => {
        return receipt
     })    
  }

  async buyNft(tokenId: number, price:number) {
    this.window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
      this.contract.methods.buyNft(tokenId).send({from: accounts[0], value: price});  
    })    
  }

  async updateNftPrice(tokenId:number, price:any) {
    const p = price.toString()
    const priceInWei = Web3.utils.toWei(p, 'ether')
    this.window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
      this.contract.methods.changeNftPrice(tokenId, priceInWei).send({from: accounts[0]})
    })
  }

}
