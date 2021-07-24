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
      this.createSvg()

    })



  }

  myclick = ()=>{

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

    this.svg.append("circle")
    .attr("cx",50)
    .attr("cy",50)
    .attr("r",40)
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("fill","red")

    //console.log("svg" )
    //console.log(this.svg )
  }
}
