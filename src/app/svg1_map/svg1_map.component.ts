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
  k: any=5;
  myData: any;
  slideMax: number;
  

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
        this.slideMax = data.length - 5
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
      
      this.k = event.value +4
      this.drawMAp(this.myData)

    }
    


  }

  
  private createSvg(): void {
   
    this.varName = ""
    this.color  = ["blue", "green"]

    this.myColor = d3.scaleLinear()
    .domain([-1, 0, 1])
    .range(this.color);

    const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', this.zoomed);

    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 2000)
    .append("g")
    .attr("transform", "translate(" + "-11000" + "," + "-10500" + ")");
    
    //console.log("svg" )
    //console.log(this.svg )
  }

  

  private drawMAp(data: any[]): void {
    
    

    

    let dataP = data.map(x=>Number(x[this.k]))

    let mymin = d3.min(dataP)
    let mymax = d3.max(dataP)

    this.myColor = d3.scaleLinear()
    .domain([mymin,mymax])
    .range(this.color);


    console.log("MAP")

    console.log( data )
    

    this.varName = this.names[this.k]

    this.svg.selectAll("*").remove()

    // Create the Map
    this.svg.selectAll("Map")
    .data(data)
    .enter()
    .append("path")
    .attr("d",  d => (d[4])?(d[4]):"")
    .attr("stroke", "black")
    .attr("fill", d => (d[this.k])?this.myColor(Number(d[this.k])):"white")




    
  }

   zoomed() {

  }


}

