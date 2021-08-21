import { ChangeDetectorRef, Component, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { updatedd } from 'src/app/Rxjs/actions/main.actions';
import {  selectCrossVar, selectCrossVar1, selectFocusVar, selectupdatedd } from 'src/app/Rxjs/reducers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'ddVarName',
  templateUrl: './dd-var-name.component.html',
  styleUrls: ['./dd-var-name.component.css']
})
export class DdVarNameComponent implements OnInit {

  @Input()
  varIndex: string;
  
  displayedColumns1 = ["variable","texte"];
  displayedColumns2 = ["variable","code","texte"];


  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  resultsLength1: number;
  resultsLength2: number;
  variables: any[];
  cat: any[];
  varName: any;
  sub1: any;

  constructor(  
    private store:Store,
    private dataService:DataService,
    private changeDetectorRefs: ChangeDetectorRef) { }



  
  ngOnInit(){
    console.log("init ")
    
    this.dataSource1 = new MatTableDataSource<any>([]); 
    this.dataSource2 = new MatTableDataSource<any>([]); 
    
    this.sub1 = this.store.pipe(select(selectCrossVar)).subscribe(data=>{
      console.log("selectCrossVar",data)
      if(this.varIndex){
        if(data){
          console.log("varIndex",this.varIndex)
          this.varName = data[this.varIndex]
          
          console.log(this.varName)
          this.dataChange(this.varName)
        }
      
      }

    })
    this.dataService.variablesdd$.subscribe((data)=>{
      //console.log(data)
      this.variables = data
      this.dataSource1.data = data
      this.resultsLength1 = data.length
      
      //this.changeDetectorRefs.markForCheck()
      

    })
    
    this.dataService.categoriesdd$.subscribe((data)=>{
      //console.log(data)
      this.cat = data
      this.dataSource2.data = data
      this.resultsLength2 = data.length
      //
      //this.changeDetectorRefs.markForCheck()

    })

  }

  ngOnChanges(changes: any) {
        
    
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
  }


  dataChange = (data)=>{

    console.log("data change")
    console.log(data)
    if(this.variables){
      this.dataSource1.data = this.variables.filter((data2)=>data2.variable == data)
      this.dataSource2.data = this.cat.filter((data2)=>data2.title == data)
    }
  }


  ngAfterViewInit(): void {

   
    
   
    //this.dataSource1 = 
    //this.dataSource2 = new MatTableDataSource<any>([]);
    
    //
    this.dataSource1.paginator = this.paginators.get(0);
    this.dataSource2.paginator = this.paginators.get(1);





  }




  private createFilter1(): (contact: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      console.log("inside filter")
      return data.variable.indexOf(filter) !== -1
    }

    return filterFunction;
  }


}
