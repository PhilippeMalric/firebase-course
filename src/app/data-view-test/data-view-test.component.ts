import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Graph1Component } from '../chart/graph1/graph1.component';

@Component({
  selector: 'data-view-test',
  templateUrl: './data-view-test.component.html',
  styleUrls: ['./data-view-test.component.css']
})
export class DataViewTestComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

click = ()=>{
  const dialogRef = this.dialog.open(DialogTest,{
    width: '800px',
    data: { component: Graph1Component}});
      
  dialogRef.afterClosed().subscribe(result => {
    //this.dd_present = result
    console.log(`Dialog result: ${result}`);
  });
}

}


@Component({
  selector: 'dialog-test-content',
  templateUrl: 'popup.html',
})
export class DialogTest {
  fileName$: Observable<string>;
  constructor(
    public dialogRef: MatDialogRef<DialogTest>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
