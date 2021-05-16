import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-var-view',
  templateUrl: './var-view.component.html',
  styleUrls: ['./var-view.component.css']
})
export class VarViewComponent implements OnInit {

  constructor(private dataService:DataService) { 
    
  }

  ngOnInit(): void {
    this.dataService.findVariableByNom('DG03').subscribe(function(data){
      console.log(data)
    })
  }

}
