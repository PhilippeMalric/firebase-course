import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';

import * as d3 from 'd3';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {
  dataset$: any;
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width = 1000
  margin = 20
  h2 = 250
  clearSub: any;
  data: [any[], any[], any[]];
  

  constructor(
    private dataService:DataService,
    private store:Store
    ) {

      this.dataset$ = this.dataService.dataset$

     }

  ngOnInit(): void {

    this.createSvg()

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



  }

  myclick = ()=>{

    console.log("data",this.data[0])

    if(this.svg){
      this.svg.selectAll("*").remove()
    }

    //let dataSplit = this.data[0].slice(1,500).map(data=>data.slice(0,100))

    let random_num = Math.floor( Math.random() * this.data[0].length -2)

    let dataSplit = this.data[0].slice(random_num+1,random_num+2)

    let na_table_t = []
    

    let na_table = dataSplit[0].map((data,j)=>{

        return data != "NA"

      })
      

      



  let nrow = Math.floor(Math.sqrt(na_table.length))
  let ncol = Math.floor(na_table.length/nrow)+1

  let px_per_cell_x = this.width / ncol
  let px_per_cell_y = this.h2 / nrow

    console.log(px_per_cell_x,px_per_cell_y)

    console.log(na_table_t)
  
      this.svg.selectAll()
            .data(na_table)
            .enter()
            .append("circle")
            .attr("class","na_cell")
            .attr("cx",(data,j)=>((j%ncol)*px_per_cell_x)+px_per_cell_x/2)
            .attr("cy",(data,j)=>(Math.floor(j/ncol)*px_per_cell_y)+px_per_cell_y/2)
            .attr("r",3)
            //.attr("stroke","black")
            .attr("stroke-width",1)
            .attr("fill",(data,j)=>(data)?"black":"red")
    


  }

  ngAfterViewInit() {
    this.createSvg()
  }

  ngOnDestroy(){
    this.clearSub.unsubscribe()
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
}
