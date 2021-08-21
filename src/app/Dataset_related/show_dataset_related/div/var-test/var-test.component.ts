import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { clearSVGon, stopInterval } from 'src/app/Rxjs/actions/main.actions';
import { selectFileName, selectData } from 'src/app/Rxjs/reducers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'var-test',
  templateUrl: './var-test.component.html',
  styleUrls: ['./var-test.component.css']
})
export class VarTestComponent implements OnInit {

 /*  _varName: String;
  get varName(): String {
    return this._varName;
}
  @Input() set varName(value: String) {
    this._varName = value;
    this.clearData();
  } */
  
  dixPremiers: String[] = [];
  
  categoriesD: {};
  fileName$: any;

  constructor(

    private store:Store,
    private dataService:DataService
    
    ) { 
    
    
  }

  ngOnInit(): void {


    this.fileName$ = this.store.pipe(select(selectFileName))

    this.store.pipe(select(selectData)).subscribe((data:any)=>{
      //console.log("data")
      //console.log(data)
     
      if(data != "**premier**"){
        //this.dataService.modifieCategories(data)
        
        this.dixPremiers.unshift(data)
        if(this.dixPremiers.length > 10){
          this.dixPremiers = this.dixPremiers.slice(0,10)
        }

      }


    })
  }

  clearData() {

    this.store.dispatch(clearSVGon({data:""}))

  }

  stopStream() {

    this.store.dispatch(stopInterval({data:""}))

  }

}
