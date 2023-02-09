import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ContractService } from '../contract.service';
import { TransactionsService } from '../transactions.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  address!: any
  tokenUriList!: any
  showPriceForm:boolean = false
  newPrice = new FormControl(0.01)
  currentTokenId!: number;

  constructor(private route: ActivatedRoute, private service: ContractService, private transaction: TransactionsService) { }

  ngOnInit(): void {
    this.address = this.route.snapshot.paramMap.get('address')
    this.getAddressTokens()  
  }

  async getAddressTokens() {
    this.tokenUriList = await this.service.createTokenList(this.address)    
  }

  async buyNft(tokenId:number, price:number){
    await this.transaction.buyNft(tokenId, price)    
  }

  changeNftPrice(tokenId:number, newPrice:number) {
    return false
  }

  showHideForm(tokenId:number) {
    this.showPriceForm = !this.showPriceForm
    this.currentTokenId = tokenId

  }

  async updatePrice() {    
    this.transaction.updateNftPrice(this.currentTokenId, this.newPrice.value)    
  }

}
