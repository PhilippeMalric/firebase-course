import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Statistique } from '../model/statistique';
import { State } from '../reducers/main.reducer';
import { DataService } from '../services/data.service';

@Component({
  selector: 'var-test',
  templateUrl: './var-test.component.html',
  styleUrls: ['./var-test.component.css']
})
export class VarTestComponent implements OnInit {

  _varName: String;
  get varName(): String {
    return this._varName;
}
  @Input() set varName(value: String) {
    this._varName = value;
    this.clearData();
  }
  
  dixPremiers: String[] = [];
  
  categoriesD: {};

  constructor(private store:Store,private dataService:DataService) { 
    
    this.categoriesD = {}
  }

  ngOnInit(): void {
    this.store.subscribe((state:any)=>{
      //console.log("data")
      console.log(state)

      let data = state.main.data
     
      if(data != "**premier**"){
        this.modifieCategories(data)

        this.dixPremiers.unshift(data)
        if(this.dixPremiers.length > 10){
          this.dixPremiers = this.dixPremiers.slice(0,10)
        }

      }
    })
  }

  clearData() {

    this.categoriesD = {}

  }

  modifieCategories(data: String) {
    
    if( Object.keys(this.categoriesD).includes(""+data) ){
      this.categoriesD[""+data] = this.categoriesD[""+data] +1
    }else{
      this.categoriesD[""+data] = 1
    }

    let categories = Object.keys(this.categoriesD).map((cat)=>{
      return {categorie:cat,count:this.categoriesD[""+cat]}
    })
    this.dataService.categories$.next(categories)

  }

}
