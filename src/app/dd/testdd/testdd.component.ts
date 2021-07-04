import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { selectFocusVar } from 'src/app/reducers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'testdd',
  templateUrl: './testdd.component.html',
  styleUrls: ['./testdd.component.css']
})
export class TestddComponent implements OnInit {

  displayedColumns1 = ["variable","texte"];
  displayedColumns2 = ["variable","code","texte"];


  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  resultsLength1: number;
  resultsLength2: number;
  variables: any[];
  cat: any[];

  constructor(  private store:Store,private dataService:DataService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(){
    this.dataSource1 = new MatTableDataSource<any>([]); 
    this.dataSource2 = new MatTableDataSource<any>([]); 
  }

  ngAfterViewInit(): void {
    //this.dataSource1 = 
    //this.dataSource2 = new MatTableDataSource<any>([]);
    
    //
    this.dataSource1.paginator = this.paginators.get(0);
    this.dataSource2.paginator = this.paginators.get(1);

    this.store.pipe(select(selectFocusVar)).subscribe((data)=>{

      console.log("data focus var")
      console.log(data)
if(this.variables){
  this.dataSource1.data = this.variables.filter((data2)=>data2.variable == data)
  this.dataSource2.data = this.cat.filter((data2)=>data2.title == data)
}
      
    })

    this.dataService.variablesdd$.subscribe((data)=>{
console.log(data)
      this.variables = data
      this.dataSource1.data = data
      this.resultsLength1 = data.length
      
      //this.changeDetectorRefs.markForCheck()
      

    })
    
    this.dataService.categoriesdd$.subscribe((data)=>{
      console.log(data)
      this.cat = data
      this.dataSource2.data = data
      this.resultsLength2 = data.length
      //
      //this.changeDetectorRefs.markForCheck()

    })


  }




  private createFilter1(): (contact: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      console.log("inside filter")
      return data.variable.indexOf(filter) !== -1
    }

    return filterFunction;
  }


}
