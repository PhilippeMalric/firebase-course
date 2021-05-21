import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-svg1',
  templateUrl: './svg1.component.html',
  styleUrls: ['./svg1.component.css']
})
export class Svg1Component implements OnInit {
  
  @Input() varName: String;
  @Input() data2: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private h2 = 450

  sub1: Subscription;
  x: d3.ScaleBand<string>;
  constructor(private dataService:DataService,private ref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createSvg()
    this.sub1 = this.dataService.categories$.subscribe((data)=>{
      this.drawBars(data)
      //this.ref.markForCheck()
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
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    console.log("svg" )
    console.log(this.svg )
  }

  private drawBars(data: any[]): void {
    
    this.svg.selectAll("*").remove()
   
    console.log(data)
    // Create the X-axis band scale
    this.x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.categorie))
    .padding(0.2);

    console.log(data.map(d => d.categorie))

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-25)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => this.x(d.categorie))
    .attr("y", d => y(d.count))
    .attr("width", this.x.bandwidth())
    .attr("height", (d) => this.height - y(d.count))
    .attr("fill", "#d04a35");
  }

}
