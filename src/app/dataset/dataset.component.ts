import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Dataset } from '../model/dataset';



@Component({
  selector: 'dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

  dataset:Dataset;

  loading = false;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {

      this.dataset = this.route.snapshot.data["dataset"];

  }

}
