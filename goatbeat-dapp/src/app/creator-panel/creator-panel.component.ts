import { Component, OnInit, Input, Inject } from '@angular/core';
import axios from 'axios';
import { TransactionsService } from '../transactions.service';
import Web3 from 'web3';

@Component({
  selector: 'app-creator-panel',
  templateUrl: './creator-panel.component.html',
  styleUrls: ['./creator-panel.component.css']
})
export class CreatorPanelComponent implements OnInit {

  @Input() address = ''

  artistName!: string
  artistDescription!: string
  audioName!: string
  audioFile!: any
  price!: any
  ipfsUrl = "https://ipfs.io/ipfs/"
  minting = false

  constructor(private transaction: TransactionsService) { }

  ngOnInit(): void {
    axios.post('API_HERE!', { 'address': this.address }).then(res => {
      this.artistName = res.data.name
      this.artistDescription = res.data.description
    })
  }

  async handleNameInput($event: any) {
    this.audioName = $event.currentTarget.value
    
  }

  async handleFileInput($event: any) {
    this.audioFile = $event.currentTarget.files    
  }

  async handlePriceInput($event: any) {
    let price = $event.currentTarget.valueAsNumber.toString()
    this.price = Web3.utils.toWei(price, 'ether')    
  }

  async handleMint() {
    
    if (this.audioFile.item(0).type == "audio/mpeg") {      

      this.minting = true

      const formData = new FormData();
      formData.append("file", this.audioFile.item(0))
     
      const resFile = await this.pinFileToIpfs(formData)
      
      const nftMetadata = this.createNftMetadata(this.audioName, resFile.data.IpfsHash, this.address)
      
      console.log(this.price)
      
      const resMetadata = await this.pinJsonToIpfs(nftMetadata)

      const tokenUri = this.ipfsUrl + resMetadata.data.IpfsHash      

      const resMint = await this.transaction.mintNft(this.address, tokenUri, this.price)   
      
      this.handleMintResponse(resMint)

    } else {
      alert("Not valid audio format")
    }
  }


  async pinFileToIpfs(data:any) {
    
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: data,
      headers: {
        'pinata_api_key': "API_KEY_HERE!",
        'pinata_secret_api_key': "API_SECRET_HERE!",
        "Content-Type": "multipart/form-data"
      },
    });

    return resFile
  }


  async pinJsonToIpfs(metadata:any) {
    
    const resMetadata = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: metadata,
      headers: {
        'pinata_api_key': "API_KEY_HERE!",
        'pinata_secret_api_key': "API_SECRET_HERE!",
        "Content-Type": "application/json"
      },
    });

    return resMetadata
  }

  createNftMetadata(name: string, hash: string, creator: string) {
    
    let ipfsHash = this.ipfsUrl + hash

    let uriData = {
      "name": name,
      "audio": ipfsHash,
      "creator": creator
    }

    return JSON.stringify(uriData)
  }

  handleMintResponse(response: any) {
    this.minting = false
    console.log(response)
  }

}
