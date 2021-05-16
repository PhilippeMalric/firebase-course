import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'var-test',
  templateUrl: './var-test.component.html',
  styleUrls: ['./var-test.component.css']
})
export class VarTestComponent implements OnInit {

  @Input() varName: String;
  dixPremiers: String[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.mainVar$.subscribe((data)=>{
      //console.log("data")
      //console.log(data)
      if(data != "**premier**"){

        this.dixPremiers.unshift(data)
        if(this.dixPremiers.length > 10){
          this.dixPremiers = this.dixPremiers.slice(0,10)
        }

      }
    })
  }

}
