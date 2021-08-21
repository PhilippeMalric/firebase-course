import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { generate } from 'patternomaly';
import { GoogleChartInterface } from 'ng2-google-charts';
import { take, withLatestFrom } from 'rxjs/operators';
import { selectFocusVar, selectVarName } from 'src/app/Rxjs/reducers';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'svg2',
  templateUrl: './svg2.component.html',
  styleUrls: ['./svg2.component.css']
})
export class Svg2Component implements OnInit {
  
  @Input() varName: String;
  @Input() data2: any;
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private h2 = 450
  private backgroundC = generate([
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', 
    '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', 
    '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ]);

  


  sub1: Subscription;
  x: d3.ScaleBand<string>;
  canvas: any;
  ctx: any;
  myChart: any;
  graph: { data: ({ x: number[]; y: number[]; type: string; mode: string; marker: { color: string; }; } | { x: number[]; y: number[]; type: string; mode?: undefined; marker?: undefined; })[]; layout: { width: number; height: number; title: string; }; };
 
  rows: any[];
  dt: any
  calendar: GoogleChartInterface;
  jsChart: boolean=false;
  reset: boolean;
  allData: any[];
  sliceInd: number;
  div: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
 

 

  constructor(
    
    private dataService:DataService,
    private ref:ChangeDetectorRef,
    private store:Store) { }

    
  ngOnInit(): void {

    this.ctx = 'myChart'; 

    
    
    this.store.pipe(select(selectFocusVar),withLatestFrom(this.dataService.dataset$))
    .subscribe((data:any)=>{
      console.log("--------------------------------svg")
      console.log(data)
      //this.createSvg(data)
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

  next = ()=>{
    
    this.sliceInd = ( this.sliceInd +1 ) % Math.floor( this.allData.length / 10)
    console.log(this.sliceInd )
    let sliceEnd = ((this.sliceInd +1)*10 > this.allData.length)?this.allData.length:(this.sliceInd +1)*10
    this.createSvg(this.allData.slice(this.sliceInd*10,sliceEnd))
       
  }
  prev = ()=>{
    
    if(this.sliceInd == 0){
      this.sliceInd = Math.floor( this.allData.length / 10)
    }else{
      this.sliceInd = ( this.sliceInd -1 ) % Math.floor( this.allData.length / 10)
    }
    let sliceEnd = ((this.sliceInd +1)*10 > this.allData.length)?this.allData.length:(this.sliceInd +1)*10 

    this.createSvg(this.allData.slice(this.sliceInd*10,sliceEnd))
      

  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.dataService.nAtable$.subscribe((data)=>{
          
        this.allData = data

        this.sliceInd = 0

        let sliceEnd = ((this.sliceInd +1)*10 > this.allData.length)?this.allData.length:(this.sliceInd +1)*10 
        this.div = d3.select("figure#variables")
        this.createSvg(this.allData.slice(0,sliceEnd))
        
      }
        )
    }, 4000);
    

  
    
  }


  ngOnDestroy(){
    this.sub1.unsubscribe()
  }

  

  
  private createSvg(data:any): void {
    

    console.log("-------------dataPASsion")
    console.log(data)

    this.div.selectAll(".svg").remove()
   
    this.svg = this.div
    .append("svg").attr("class","svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.h2 + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");


    let group = this.svg.selectAll(".item")
      .data(data)
      .enter()
      .append("g")
      .attr("class","cir")
      .attr("transform",(d,i)=>{return  "translate(" + 10 + "," + (i * 50) + ")"});
    
    group.append('circle')
    .attr('cx', 10)
    .attr('cy', 0)
    .attr('r', d=>((1-d.pcNA) *25)+5)
    .attr('stroke', 'black')
    .attr('fill', '#9ca3b2');

    group.append('text')
    .attr('x', 70)
    .attr('y', 0)
    .attr('stroke', 'black')
    .style("font-size", 18)
    .text(d=>d.name)

    //console.log("svg" )
    //console.log(this.svg )
  }

  

  private drawBars(data: any[]): void {
    
    this.svg.selectAll("*").remove()
   
    let mymax = d3.max(data.map(x=>x.count))

    //console.log(data)
    // Create the X-axis band scale
    this.x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.categorie))
    .padding(0.2);

    //console.log(data.map(d => d.categorie))

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(this.x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-25)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, mymax])
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

  createPieChart = (data)=>{

      this.dataService.categoriesdd$.
      pipe(
        withLatestFrom(
          this.store.pipe(select(selectVarName),take(1))
          )).subscribe(([dd,varName]) => {
    
        console.log(dd)
        let myCompare = function(dataA,dataB){
    
          let codeA = dd.filter(data3=>data3.title == varName && data3.answer_fr.slice(0, 120) == dataA[0])
          let codeB = dd.filter(data3=>data3.title == varName && data3.answer_fr.slice(0, 120) == dataB[0])
    
          // console.log("codeA")
          // console.log(codeA)
          // console.log(dataA[0])
          // console.log("codeB")
          // console.log(codeB)
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
          return Number(codeA[0].code) - Number(codeB[0].code)
    
        }
        this.reset = true


        let allNum = data.filter((x)=>x.categorie != 'NA' && 
              x.categorie != ''&& x.categorie != 'Other').filter((x)=>{

          return !isNaN(Number(x.categorie))

        }).length != 0 

        if(allNum){
            this.rows = data.filter((x)=>x.categorie != 'NA' && x.categorie != '').map((x)=>{
              return [x.categorie,x.count]
          })
        }else{
          this.rows = data.filter((x)=>x.categorie != 'NA' && x.categorie != '').map((x)=>{
        
            if(dd.filter(data3=>data3.title == varName && 
              data3.answer_fr.slice(0, 120) == x.categorie).length > 0){
                return [dd.filter(data3=>data3.title == varName && data3.answer_fr.slice(0, 120) == x.categorie)[0].answer_fr,x.count]
            }
            console.log("prob1")
            return["erreur",x.count]
          })
      
        }
        
        if(dd.filter(data=>data.title == varName).length > 0){
          this.rows.sort(myCompare)
        }else{
          this.rows.sort((a,b)=>Number(a[0])-Number(b[0]))
        }
        
    console.log(this.rows)
      
    
    
        this.calendar = {
          chartType: 'PieChart',
          dataTable: this.rows,
          firstRowIsData: true,
          options: {
            is3D: true,
            height: 800 ,
            width : 900,
            'title': varName},
        };
     
    
      });
    }
    
}



