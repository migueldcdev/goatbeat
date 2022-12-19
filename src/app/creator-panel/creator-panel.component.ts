import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-creator-panel',
  templateUrl: './creator-panel.component.html',
  styleUrls: ['./creator-panel.component.css']
})
export class CreatorPanelComponent implements OnInit {

  @Input() address = ''

  constructor() { }

  ngOnInit(): void {
    axios.post('http://localhost:3000/artist', {'address': this.address}).then(res => {
      console.log(res)
    })
  }

}
