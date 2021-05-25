import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { select, Store } from '@ngrx/store';
import { updateNo_na } from '../actions/main.actions';
import { selectData, selectFileName } from '../reducers';

@Component({
  selector: 'app-data-div',
  templateUrl: './data-div.component.html',
  styleUrls: ['./data-div.component.css']
})
export class DataDivComponent implements OnInit {
  fileName$: any;
  switchs:[{text:String,my_f:(i) => void,checked:boolean}]
  data$: any;
  constructor(private store:Store) {

    this.switchs = [{text:"No NA",my_f:this.no_na,checked:false}]



   }

  ngOnInit(): void {
    this.fileName$ = this.store.pipe(select(selectFileName))
    this.data$ = this.store.pipe(select(selectData))
    
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
