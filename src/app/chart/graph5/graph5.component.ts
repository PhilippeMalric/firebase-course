import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';

import * as d3 from 'd3';
import { take, withLatestFrom } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { selectddCatCode, selectddCatLabel, selectddCatVarName, selectddVarDesc, selectddVarName, selectno_na, selectVarName } from 'src/app/reducers';
import { updateVarName } from 'src/app/actions/main.actions';

/*
Graph5 

Permet de selectionner une variable et de montrer des statistiques et des graphique



*/


@Component({
  selector: 'app-graph5',
  templateUrl: './graph5.component.html',
  styleUrls: ['./graph5.component.css']
})
export class Graph5Component implements OnInit {
  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
 
  dataset$: any;
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width = 1000
  margin = 20
  h2 = 250
  clearSub: any;
  data: [any[], any[], any[]];
  variables: any[];
  dataSource1: any;
  resultsLength1: number;
  cat: any[];
  dataSource2: any;
  displayedColumns1 = ["variable","texte_fr","texte_en"];
  displayedColumns2 = ["variable","code","texte"];
  chart = true
  reset = false
  categories: any[];
  resultsLength2: number;
  clickedRows = new Set<any>();
  subVarName: any;
  rows: any;
  calendar: any
  myChart: any;
  backgroundC: any;
  borderColor: any;
  currentIndex: any;
  varNames: any;
  varNames2 = [];
  pageIndex1: number;
  currentIndexdd: any;
  desc: string;
  row: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == "m"){
      this.findNextVar()
    }
    if(event.key == "n"){
      this.findPrevVar()
    }
    console.log("event.key",event.key)
  }

  constructor(
    private dataService:DataService,
    private store:Store,
    private changeDetectorRefs: ChangeDetectorRef
    ) {

      this.dataset$ = this.dataService.dataset$

     }

  ngOnInit(): void {



    this.store.pipe(select(selectno_na)).pipe(withLatestFrom(this.dataService.variablesdd$)).subscribe((data)=>{
      console.log(data)
      if(data && data[1] && data[1][0]){
        if(!this.row ){
          this.row = data[1][0]
        }
        this.store.pipe(select(selectVarName))
        .pipe(take(1),withLatestFrom(
          this.dataService.dataset$,
            this.store.pipe(select(selectno_na),take(1))))
        .subscribe((data:any)=>{
          console.log("graph5 : no_NA")
          console.log(data)
          this.stat(data[1],data[0],data[2])
        })
      }
    })


    this.currentIndex = 1;


    this.dataSource1 = new MatTableDataSource<any>([]); 
    this.dataSource2 = new MatTableDataSource<any>([]); 
    

    this.dataService.dataset$.subscribe((data)=>{

      if(data && data.length > 0){
        this.varNames = data[0]

      }
    })


    this.subVarName = this.store.pipe(select(selectVarName))
    this.subVarName.pipe(withLatestFrom(
      this.dataService.categoriesdd$,
      this.store.pipe(select(selectddCatVarName),take(1)),
      this.store.pipe(select(selectddCatCode),take(1)),
      this.store.pipe(select(selectddCatLabel),take(1))
    )).subscribe((data:any)=>{
      console.log("total",data)
      let varName = data[0]
      let name = data[2]
      let code = data[3]
      let label = data[4]
      console.log("categories",data[1])
      this.categories = data[1].map((x,i)=>{
        x.title = data[1][i][name]
        x.code = data[1][i][code]
        x.answer_fr = data[1][i][label]
        return(x)
      })

      this.categories = this.categories.filter((data:any)=>{

        return data.title == varName

      })

      this.cat = this.categories
      this.dataSource2.data = this.categories
      this.resultsLength2 = this.categories.length


    })

    this.store.pipe(select(selectVarName))
    .pipe(withLatestFrom(
      this.dataService.dataset$,
        this.store.pipe(select(selectno_na),take(1))))
    .subscribe((data:any)=>{
      console.log("graph5 : categories")
      console.log(data)
      this.stat(data[1],data[0],data[2])
    })

    this.dataSource2.data = this.categories


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
        this.varNames2[i]= data[0][i][name]
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

    //this.createSvg()
/*
    this.clearSub = this.store.subscribe((state:any)=>{
      let clear = state.main.clearState
      if(clear){
        this.svg.selectAll("*").remove()
        this.createSvg()
      }
    })

    this.dataService.dataset$.pipe(
      withLatestFrom(this.dataService.variablesdd$,this.dataService.categoriesdd$)
    ).subscribe((data)=>{
      console.log("data",data)
      this.data = data
      this.createSvg()

    })

*/

  }
  

  ngAfterViewInit(): void {
    //this.dataSource1 = 
    //this.dataSource2 = new MatTableDataSource<any>([]);
    
    //
    this.dataSource1.paginator = this.paginators.get(0);
    this.dataSource2.paginator = this.paginators.get(1);

  }


  findPrevVar = ()=>{

    console.log("varNames",this.varNames2,this.currentIndex)
    
        if(this.currentIndexdd != 0){
          this.currentIndexdd = this.currentIndexdd -1

          let row = this.variables.filter((data:any)=>{

            return data.variable == this.varNames2[this.currentIndexdd]

          })[0]

          console.log(row,this.variables,this.varNames2[this.currentIndexdd])

          this.clickRows(row)
    
          //return this.options2[this.currentIndex++]
    
        }else{
          this.currentIndexdd = this.varNames2.length
          let row = this.variables.filter((data:any)=>{

            data.variable == this.varNames2[this.currentIndexdd]

          })[0]
          this.clickRows(row)
          
        }
    
      }

  findNextVar = ()=>{

    console.log("varNames",this.varNames,this.currentIndex)
    
        if(this.currentIndexdd < this.varNames2.length){
          this.currentIndexdd = this.currentIndexdd +1

          let row = this.variables.filter((data:any)=>{

            return data.variable == this.varNames2[this.currentIndexdd]

          })[0]

          console.log(row,this.variables,this.varNames2[this.currentIndexdd])

          this.clickRows(row)
    
          //return this.options2[this.currentIndex++]
    
        }else{
          this.currentIndexdd = 0
          let row = this.variables.filter((data:any)=>{

            data.variable == this.varNames2[this.currentIndexdd]

          })[0]
          this.clickRows(row)
          
        }
    
      }

      

  clickRows(row){
    this.row = row
    this.clickedRows.clear()
    this.clickedRows.add(row)
    console.log("row",row)
    this.store.dispatch(updateVarName({data:row.variable}))

    this.currentIndexdd = this.varNames2.indexOf(row.variable)
    this.currentIndex = this.varNames2.indexOf(row.variable)
    console.log("currentIndex",this.currentIndexdd)
    let page = Math.floor( (this.currentIndexdd) / 5 )
    console.log("page",page)
    if(this.paginators){
      let pag1 = this.paginators.get(0);
      pag1.pageIndex = page
      this.dataSource1.paginator = pag1
    }
   
    this.changeDetectorRefs.markForCheck()
  }


  ngOnDestroy(){
    //this.clearSub.unsubscribe()
  }

  createSvg(): void {
    if(this.svg){
      this.svg.selectAll("*").remove()
    }
    
    console.log(d3.select("figure#bar"))
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.h2 + (this.margin * 2))
    .attr("style", "background-color:white")
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    console.log(this.svg)

    
    //console.log("svg" )
    //console.log(this.svg )
  }


  createGraph(categories: any) {

    this.reset = false

    if(categories.length > 0 ){
      

      if(categories.length < 20){
        
        setTimeout(() => {
          this.createPieChart(categories)},200)

      }
      else{
        console.log("data[1].categorie")
        console.log(categories[1].categorie)
        
        if(categories[1].categorie.split(" ")[0].split("-").length > 2 ){
          
          this.store.pipe(select(selectVarName),take(1),
          withLatestFrom(
            this.store.pipe(select(selectddVarName),take(1)),
            this.store.pipe(select(selectddVarDesc),take(1)),
            this.dataService.variablesdd$
          )).subscribe(([
            varName, 
            ddVarName,
            ddVarDesc,
            ddVar
          ])=>{

            setTimeout(() => {
              this.reset = true
              let years = {}
  
              this.desc = ""
              this.desc = ddVar.filter(data=>data[ddVarName] == varName)[0][ddVarDesc]
        

              this.rows = categories.filter((x)=>x.categorie != 'NA' && x.categorie != '').map((x)=>{
              
              let date = x.categorie.split(" ")[0].split("-")
              years[date[0]]=1
              return[new Date(date[0],Number(date[1])-1,date[2]),x.count]})
    
            let numberOfYear = Object.keys(years).length
    
    
              this.calendar = {
                chartType: 'Calendar',
                dataTable: this.rows,
                firstRowIsData: true,
                options: {
                  height: 200 * numberOfYear ,
                  width : 1200,
                  'title': varName },
              };
           
    
            }, 100);

          })
          
          
      }else{
        setTimeout(() => {
          this.createPieChart(categories)},100)
      }
        
    }
  }
}


  createPieChart = (categories)=>{

    this.dataService.categoriesdd$.
    pipe(take(1),
      withLatestFrom(
        this.store.pipe(select(selectVarName),take(1)),
        this.store.pipe(select(selectddCatCode),take(1)),
        this.store.pipe(select(selectddCatLabel),take(1)),
        this.store.pipe(select(selectddCatVarName),take(1)),
        this.store.pipe(select(selectddVarName),take(1)),
        this.store.pipe(select(selectddVarDesc),take(1)),
        this.dataService.variablesdd$
        )).subscribe(([
          dd,
          varName,
          ddCatCode,
          ddCatLabel,
          ddCatVarName,
          ddVarName,
          ddVarDesc,
          ddVar
          ]) => {
  
      //console.log(dd)



      let myCompare = function(dataA,dataB){
  


        let codeA = dd.filter(data3=>{
          //console.log(data3)
          let ddCatstring = data3[ddCatLabel] + ""
          return data3[ddCatVarName] == varName &&
          ddCatstring.slice(0, 120) == dataA[0]
          
          })

        let codeB = dd.filter(data3=>{
          let ddCatstring = data3[ddCatLabel] + ""
          return data3[ddCatVarName] == varName &&
          ddCatstring.slice(0, 120) == dataB[0]
          
          })
  
         console.log("codeA")
         console.log(codeA)
         console.log(dataA[0])
         console.log("codeB")
         console.log(codeB)
        if(codeA.length == 0 || codeB.length == 0){
          console.log("probleme")
            console.log(dataA[0])
          console.log(dataB[0]) 
        }
        if(!codeA || codeB || ! ('code' in codeA[0]) || ! ("code" in codeB[0])){

          // console.log(dataA[0])
          // console.log(dataB[0])
          // console.log(dd.filter(data3=>data3.title == varName).map(x=>x.answer_fr.slice(0, 120)))
          
          return 0
        }
        return Number(codeA[0][ddCatCode]) - Number(codeB[0][ddCatCode])
  
      }
      this.reset = true


      let allNum = categories.filter((x)=>x.categorie != 'NA' && 
            x.categorie != ''&& x.categorie != 'Other').filter((x)=>{

        return !isNaN(Number(x.categorie))

      }).length != 0 

      if(allNum){
          this.rows = categories
          //.filter((x)=>x.categorie != 'NA' && x.categorie != '')
          .map((x)=>{
            return [x.categorie,x.count]
        })
      }else{
        this.rows = categories.map((x)=>{
      
          if(dd.filter(data3=>data3[ddCatVarName] == varName && 
            data3[ddCatLabel].slice(0, 120) == x.categorie).length > 0){
              return [dd.filter(data3=>data3[ddCatVarName] == varName &&
                 data3[ddCatLabel].slice(0, 120) == x.categorie)[0][ddCatLabel],x.count]
          }
          console.log("prob1")
          return["erreur",x.count]
        })
        /*categories.filter((x)=>x.categorie != 'NA' && x.categorie != '').map((x)=>{
      
          if(dd.filter(data3=>data3[ddCatVarName] == varName && 
            data3[ddCatLabel].slice(0, 120) == x.categorie).length > 0){
              return [dd.filter(data3=>data3[ddCatVarName] == varName &&
                 data3[ddCatLabel].slice(0, 120) == x.categorie)[0][ddCatLabel],x.count]
          }
          console.log("prob1")
          return["erreur",x.count]
        })*/
    
      }
      
      this.rows = this.convertRows(dd,this.rows,ddCatLabel,ddCatVarName,ddCatCode,varName)
      this.desc = ""
      let desc = ""
      desc = ddVar.filter(data=>data[ddVarName] == varName)[0][ddVarDesc]

      if(dd.filter(data=>data[ddCatVarName] == varName).length > 0){
        this.rows.sort(myCompare)
      }else{
        this.rows.sort((a,b)=>Number(a[0])-Number(b[0]))
      }
      
  console.log("rows",this.rows)
    
      this.calendar = {
        chartType: 'PieChart',
        dataTable: this.rows,
        firstRowIsData: true,
        options: {
          is3D: true,
          height: 800 ,
          width : 900,
          'title': varName +" : " + desc},
      };
   
  
    });
  }
  

  convertRows(dd,rows,ddCatLabel,ddCatVarName,ddCatCode,varName){

    for(let e of rows){
      let value = dd.filter(data=>data[ddCatVarName] == varName &&
        data[ddCatCode] == e[0])

      if(value.length == 1){
        e[0] = value[0][ddCatLabel] + ""
      }
    }

    return rows

  }

  stat = (dataset,varname,no_NA)=>{
    console.log("stat2")
    //console.log(varNames.includes(this.myControl.value))
    if(dataset[0].includes(varname)){
      
      let n = dataset[0].indexOf(varname)
      console.log( "n" )
      console.log( n )
      let col = dataset.map(x=>x[n])
      console.log("col", col )
      this.createStatDesc(col,no_NA)
    }
       
      
  }

  createStatDesc = (col,no_NA)=>{
    if(!no_NA){
      col = col.map((data)=>{

        return (data=="")?"NA":data

      })
    }
    else{
      col = col.filter((data)=>{

        return data != ""

      })
    }
    console.log("length")
    console.log(col.length)
    let stat_desc = this.createCount(col)
    console.log("stat_desc ------------------------------------")
    console.log(stat_desc)
    this.createGraph(stat_desc)
  }





  createCount(arr){
    if(arr[1].split(" ")[0].split("-").length > 2 ){
      arr = arr.map(x=>x.split(" ")[0])

    }
  var counts = {};
  for (var i = 1; i < arr.length; i++) {
      counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }

  let result = Object.keys(counts).sort().map((key)=>{
    return {categorie:key,count:counts[key]}
  })

  return result
}

}
