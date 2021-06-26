import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { withLatestFrom } from 'rxjs/operators';
import { selectCrossVar } from 'src/app/reducers';
import { DataService } from 'src/app/services/data.service';
declare var google:any;

@Component({
  selector: 'cross-var',
  templateUrl: './cross-var.component.html',
  styleUrls: ['./cross-var.component.css']
})
export class CrossVarComponent implements OnInit {
  sub1: any;
  chart: any
  reset: boolean
  rows: any;
  
  constructor(private store:Store,private dataService:DataService) { }

  ngOnInit(): void {
    this.sub1 = this.dataService.crossVarCompte$.pipe(

      withLatestFrom(
        this.store.pipe(select(selectCrossVar)),
        this.dataService.categoriesdd$
        )


    ).subscribe(([data,vars,dd])=>{
    
      this.reset = false
      setTimeout(() => {
        this.reset = true
        console.log(data)
        this.rows = data



        if(vars && data){
          let varNames = vars["0"]+" - "+vars["1"]
            console.log()
            this.chart = {
              chartType: 'PieChart',
              dataTable: this.rows,
              //firstRowIsData: true,
              options: {
                is3D: true,
                height: 400 ,
                width : 900,
                'title': varNames},
            };
  
  
        }

      }, 100);
      



     
    })
  }
  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

}
