import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'var-test',
  templateUrl: './var-test.component.html',
  styleUrls: ['./var-test.component.css']
})
export class VarTestComponent implements OnInit {

  @Input() varName: String;

  constructor() { }

  ngOnInit(): void {
  }

}
