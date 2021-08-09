import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { take, withLatestFrom } from 'rxjs/operators';
import { selectddCatCode, selectddCatLabel, selectddCatVarName, selectddVarDesc, selectddVarName, selectFocusVar } from 'src/app/reducers';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'testdd',
  templateUrl: './testdd.component.html',
  styleUrls: ['./testdd.component.css']
})
export class TestddComponent implements OnInit {

  displayedColumns1 = ["variable","texte_fr","texte_en"];
  displayedColumns2 = ["variable","code","texte"];


  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  resultsLength1: number;
  resultsLength2: number;
  variables: any[];
  cat: any[];
  categories: any[];

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

    this.dataService.variablesdd$.pipe(withLatestFrom(
      this.store.pipe(select(selectddVarName),take(1)),
      this.store.pipe(select(selectddVarDesc),take(1)))).subscribe((data)=>{
      console.log("variable")
      console.log(data)
      let name = data[1]
      let desc = data[2]
      this.variables = data[0].map((x,i)=>{
        x.texte_fr = data[0][i][desc]
        x.variable = data[0][i][name]
        return(x)

      })
      console.log(this.variables)
      this.dataSource1.data = this.variables
      this.resultsLength1 = this.variables.length
      
      //this.changeDetectorRefs.markForCheck()
      

    })
    
    this.dataService.categoriesdd$.pipe(withLatestFrom(
      this.store.pipe(select(selectddCatVarName),take(1)),
      this.store.pipe(select(selectddCatCode),take(1)),
      this.store.pipe(select(selectddCatLabel),take(1)))).subscribe((data)=>{
      console.log(data)
      let name = data[1]
      let code = data[2]
      let label = data[3]
      console.log(data[0])
      this.categories = data[0].map((x,i)=>{
        x.title = data[0][i][name]
        x.code = data[0][i][code]
        x.answer_fr = data[0][i][label]
        return(x)

      })

      this.cat = this.categories
      this.dataSource2.data = this.categories
      this.resultsLength2 = this.categories.length
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
