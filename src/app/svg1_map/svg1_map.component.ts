import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as d3 from 'd3';
import { map } from 'd3';
import { Subscription } from 'rxjs';
import { selectCategories } from '../reducers';
import { MainState } from '../reducers/main.reducer';
import { DataService } from '../services/data.service';

@Component({
  selector: 'svg1_map',
  templateUrl: './svg1_map.component.html',
  styleUrls: ['./svg1_map.component.css']
})
export class Svg1_mapComponent implements OnInit {
  
  @Input() varName: String;
  @Input() data2: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private h2 = 450

  sub1: Subscription;
  x: d3.ScaleBand<string>;
  constructor(
    
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

  

  
  private createSvg(): void {
    
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.h2 + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + (this.margin-100) + "," + (this.margin - 200) + ")");

    //console.log("svg" )
    //console.log(this.svg )
  }

  

  private drawMAp(data: any[]): void {
    
    console.log("MAP")

    this.svg.selectAll("*").remove()

    // Create the Map
    this.svg.selectAll("Map")
    .data(data)
    .enter()
    .append("path")
    .attr("d",  d => d[3])
    .attr("stroke", "black")
    .attr("fill", "red");
  }

}
