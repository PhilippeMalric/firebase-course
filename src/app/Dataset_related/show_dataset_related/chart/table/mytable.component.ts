import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'myTable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MyTableComponent implements OnInit {
  
  displayedColumns: string[] = ['nom', 'n'];
  dataSource = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.categories$
    .subscribe((data:any)=>{
      console.log("Table")
      console.log(data)
      this.dataSource = data


    })
  }

}