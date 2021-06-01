import { ChangeDetectorRef, HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as d3 from 'd3';
import { map } from 'd3';
import { Subscription } from 'rxjs';
import { D3Service } from '../d3';

import { selectCategories } from '../reducers';
import { MainState } from '../reducers/main.reducer';
import { DataService } from '../services/data.service';

@Component({
  selector: 'svg1_map',
  templateUrl: './svg1_map.component.html',
  styleUrls: ['./svg1_map.component.css']
})
export class Svg1_mapComponent implements OnInit {
  myColor: d3.ScaleLinear<number, number, never>;
  color: any;
  k: any;
  myData: any;
  slideMax: number;
  g1: any;
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.graph.initSimulation(this.options);
  }

  @Input() varName: String;
  @Input() data2: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private h2 = 450

  sub1: Subscription;
  x: d3.ScaleBand<string>;
  names: any;
  constructor(
    private d3Service: D3Service, 
    private dataService:DataService,
    private ref:ChangeDetectorRef,
    private store:Store) { }

    
  ngOnInit(): void {
    
    this.createSvg()
 
    this.dataService.datasetSVG$
    .subscribe((data:any)=>{
      console.log("svg_map")
      console.log(data)
      if(Object.keys(data).length > 0){
        this.names =  data.shift()
        this.myData = data
        this.slideMax = data[0].length - 4 
        this.k = 4
        this.drawMAp(data)
      }
      
      //this.ref.markForCheck()
    })
  

    
    this.store.subscribe((state:any)=>{
      let clear = state.main.clearState
      if(clear){
        this.svg.selectAll("*").remove()
        //this.createSvg()
      }
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

  slideChange= (event)=>{
    console.log(event.value)
    if(this.myData){
      
      this.k = event.value +3
      this.drawMAp(this.myData)

    }
  }

  
  private createSvg(): void {
   
    this.varName = ""
    //this.color  = ["blue", "green","red"]
    this.color  = ["white", "grey","black"]

    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", 50000)
    .attr("height", 50000)


    //console.log("svg" )
    //console.log(this.svg )
  }

  

  private drawMAp(data: any[]): void {
    
    

    

    let dataP = data.map(x=>Number(x[this.k]))

    let mymin = d3.min(dataP)
    let mymax = d3.max(dataP)
    let middle = Math.round(mymax / 2)

    console.log(mymin,mymax)

    this.myColor = d3.scaleLinear()
    .domain([mymin,middle,mymax])
    .range(this.color);


    console.log("MAP")

    console.log( data )
    

    this.varName = this.names[this.k]

    this.svg.selectAll("*").remove()


    this.g1 = this.svg.append("g")
    .attr("transform", "translate(" + "-28000" + "," + "-28500" + ")");
    

    // Create the Map
    this.g1.selectAll("Map")
    .data(data)
    .enter()
    .append("path")
    .attr("d",  d => (d[3])?(d[3]):"")
    .attr("stroke", "black")
    .attr("fill", d => (d[this.k])?this.myColor(Number(d[this.k])):"white")
    .append("title").text(d=>"RSA : "+d[0]+" | n : "+d[this.k])

   


      var g = this.svg.append("g").attr("transform", "translate(" + "10" + ", 0)");

        

      let array_legend = [...Array(10).keys()]
      let legend_scale = d3.scaleLinear()
        .range([mymin,mymax])
        .domain([0, array_legend.length-1]);



        g.append("rect")
        .attr("x",-5)
        .attr("y",30)
        .attr("width",50 *10 +5)
        .attr("height",80)
        .attr("fill","white")

        g.selectAll(".legend").data(array_legend).enter()
        .append("rect")
        .attr("x",d=>d *50)
        .attr("y",50)
        .attr("width",50)
        .attr("height",50)
        .attr("fill",d=> this.myColor(legend_scale(d)))

        



        g.selectAll(".text").data(array_legend).enter()
        .append("text")
        .attr("x",d=>d *50 + 5)
        .attr("y",48)
        .attr("font-family","Verdana")
        .attr("font-size",20)
        .text(d=> Math.round(legend_scale(d)))

  }
}

