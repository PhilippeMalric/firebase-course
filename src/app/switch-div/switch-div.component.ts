import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateNo_na } from '../actions/main.actions';

@Component({
  selector: 'app-switch-div',
  templateUrl: './switch-div.component.html',
  styleUrls: ['./switch-div.component.css']
})
export class SwitchDivComponent implements OnInit {
  switchs: { text: string; my_f: (i: any) => void; checked: boolean; }[];

  constructor(private store:Store) { 
    this.switchs = [{text:"No NA",my_f:this.no_na,checked:false}]

  }

  ngOnInit(): void {
  }

  no_na = (i)=>{
    this.switchs[i].checked = ! this.switchs[i].checked
    console.log("noNA")
    this.store.dispatch( updateNo_na({data:this.switchs[i].checked}))

  }

  switchChange= (f,i)=>{
    f(i)
  }

}
