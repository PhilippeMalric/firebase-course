import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { withLatestFrom } from 'rxjs/operators';
import { selectCrossVar, selectCrossVarM } from 'src/app/Rxjs/reducers';
import { DataService } from 'src/app/services/data.service';
declare var google:any;

@Component({
  selector: 'cross-var-multi',
  templateUrl: './cross-var-multi.component.html',
  styleUrls: ['./cross-var-multi.component.css']
})
export class CrossVarMultiComponent implements OnInit {
  sub1: any;
  charts: any
  reset: boolean
  rows: any;
  sub2: any;
  
  constructor(private store:Store,private dataService:DataService) { }

  ngOnInit(): void {
    this.charts = []
    this.sub2 = this.store.pipe(select(selectCrossVarM)).pipe(

      withLatestFrom(
        this.store.pipe(select(selectCrossVar)),
        this.dataService.categoriesdd$
        )


    ).subscribe(([data,vars,dd])=>{
      this.charts = []
    console.log("data multi")
    console.log(data)
      this.reset = false
      setTimeout(() => {
       
        for(let d of data){
         
          let di= {}
          di["title"] = d.title
          di["data"] = {
            chartType: 'PieChart',
            dataTable: d.data,
            firstRowIsData: true,
            options: {
              is3D: true,
              height: 400 ,
              width : 900,
              'title': d.varNames},
          };

          this.charts.push(di)

        }
        this.reset = true


      },100)
    })


  }
  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

}
