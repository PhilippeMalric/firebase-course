import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';

import * as d3 from 'd3';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component implements OnInit {
  dataset$: any;
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width = 500
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

    let dataSplit = this.data[0].slice(random_num+1,random_num+11)

    let na_table_t = []
    dataSplit[0].map((data,i)=>{
      na_table_t[i] = []
    })

    let na_table = dataSplit.map((data,i)=>{

      let result = data.map((data,j)=>{

        na_table_t[j][i] =  data != "NA"

        return data != "NA"

      })
      

      return result

    }) 



  let nrow = na_table_t.length
  let ncol = na_table_t[0].length

  let px_per_cell_x = this.width / nrow
  let px_per_cell_y = this.h2 / ncol

    console.log(px_per_cell_x,px_per_cell_y)

    console.log(na_table_t)
  
    na_table_t.map((data,i)=>{
      console.log(i)
      this.svg.selectAll()
            .data(data)
            .enter()
            .append("circle")
            .attr("class","na_cell_"+i)
            .attr("cx",(i*px_per_cell_x)+px_per_cell_x/2)
            .attr("cy",(data,j)=>(j*px_per_cell_y)+px_per_cell_y/2)
            .attr("r",(data,j)=>(data)?1:0)
            //.attr("stroke","black")
            .attr("stroke-width",1)
            .attr("fill","black")
    })


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
    .attr("style", "background-color:green")
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    console.log(this.svg)

    
    //console.log("svg" )
    //console.log(this.svg )
  }
}
