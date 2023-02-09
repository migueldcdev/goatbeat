import { Component, Inject, AfterViewInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import axios from 'axios';


@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})

export class CreatorsComponent {  
  
  window: any  
  isAddressRegistered: boolean
  isAddressProvided: boolean
  address:string = "" 
  signinForm!: any  
  

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder) {
    this.window = document.defaultView        
    this.isAddressRegistered = false
    this.isAddressProvided = false

    this.signinForm = this.formBuilder.group({      
      name: '',
      description: ''
    })

  }


  async connectWallet() {
    if(!this.window.ethereum) {
      return alert('Install Metamask');
    } 
    
    this.window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts:any) => {
      let address = accounts[0];      
      axios.post('https://gb-app-prod-gb-space-wqvmfi.mo4.mogenius.io/handle', {'address':address}).then(res => {        
        if (res.data.registered) {
          this.isAddressRegistered = true
          this.address = res.data.address
        } else {
          this.isAddressProvided = true
          this.address = res.data.address          
        } 
      })   
    });
  }


  back() {
    this.isAddressProvided = false
    this.isAddressRegistered = false
  }


  sendSigninForm(val: any) {
    val.value["address"] = this.address
    
    if(val.value.name == "" || val.value.description == "") {

      return alert("Fields name and description are required")
    
    }

    axios.post('https://gb-app-prod-gb-space-wqvmfi.mo4.mogenius.io/addartist', val.value).then(res => {
      
      axios.post('https://gb-app-prod-gb-space-wqvmfi.mo4.mogenius.io/handle', {'address':this.address}).then(res => {        
        if (res.data.registered) {
          this.isAddressRegistered = true
          this.isAddressProvided = false
        } else {
          this.isAddressProvided = true
          alert("An error occur while registering your account")         
        } 
      }) 

    })
  }

}
