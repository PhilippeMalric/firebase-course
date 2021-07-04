import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import {draw, generate} from 'patternomaly'

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.css']
})
export class TestChartComponent implements OnInit {
  myChart: any;
  private backgroundC = generate([
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', 
    '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', 
    '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
  ]);

  
  private borderColor = this.backgroundC
  ctx: string;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.ctx = 'myPieChart'; 
    this.dataService.categories$
    .subscribe((data:any)=>{
      console.log("svg")
      console.log(data)
      if(data.length > 0  && data.length < 20){

        let data_count = data.map(x=>x.count)
        console.log(data_count)
        let data2 = {
          labels: data.map(x=>x.categorie),
          datasets: [{
            label: "",
            data: data_count,
            backgroundColor: this.backgroundC.slice(1,data.length),
            borderColor: this.borderColor.slice(1,data.length),
            borderWidth: 1
          }]
        };

        if(this.myChart){
          this.myChart.destroy();
        }

        this.myChart = new Chart(this.ctx,
          {
            type: 'doughnut',
            data: data2,
            options: {
              indexAxis:"y",
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            },
          }
          );
        }
      })
    }



}
