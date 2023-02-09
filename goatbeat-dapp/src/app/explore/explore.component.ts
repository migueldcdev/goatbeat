import { Component, OnInit } from '@angular/core';
import axios from 'axios'


interface Artist  {
  id: number,
  address: string,
  name: string,
  description: string
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  artists!: Artist[]

  constructor() { }

  ngOnInit(): void {
    axios.get('API_ENDPOINT/artists').then(response => {
    this.artists = response.data      
    
    }) 
    
  }
}
