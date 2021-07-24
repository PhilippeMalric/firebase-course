import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Observable } from 'rxjs';
import {  updateFileMeta, updateFileName, updateFileSize } from '../actions/main.actions';
import { LoadCSV_ddComponent } from '../load-csv_dd/load-csv_dd.component';
import { selectFileName, selectFileName_dd } from '../reducers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'load-csv',
  templateUrl: './load-csv.component.html',
  styleUrls: ['./load-csv.component.css']
})
export class LoadCSVComponent implements OnInit {


  csvRecords: any[] = [];
  header = false;
  currentIndex: number;
  interval:any
  fileName:Observable<String>
  options: any;
  varNames: any;
  nbEntree: any;
  myData: any;
  dd_present = false
  ouvert_dataset = true
  fileName_dd: Observable<any>;

  constructor(
    public dialog: MatDialog,
    private ngxCsvParser: NgxCsvParser,
    private dataService:DataService,
    private store:Store) {
      this.fileName_dd = this.store.pipe(select(selectFileName_dd))
      this.fileName = this.store.pipe(select(selectFileName))
  }

  @ViewChild('csvReader', { static: false }) fileImportInput: any;

  ngOnInit(){
    
  }
  

  // Your applications input change listener for the CSV File
  uploadListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;
    console.log('files', files);
    if(files.length > 0 ){
      this.store.dispatch(updateFileName({data:files[0].name}))
      this.store.dispatch(updateFileSize({data:formatBytes(files[0].size)}))

    }
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        //console.log('---------------Result', result);

        
        const dialogRef = this.dialog.open(Dialogdd,{
          width: '600px',
          data: { component: LoadCSV_ddComponent}});
            
        dialogRef.afterClosed().subscribe(result => {
          this.ouvert_dataset = false
        });

        this.varNames = result[0]

        this.nbEntree = this.varNames.length

        this.myData = this.varNames.map((e,i)=>{
          
          let nbNA = result.slice(1,this.nbEntree).filter((row)=>{

           return (row[i] == "" || row[i] == "NA")

          }).length
          //console.log(nbNA)
          return {pcNA: (nbNA / this.nbEntree),name:e}

        })

        console.log("---------------myData")
        console.log(this.myData)
        this.dataService.nAtable$.next(this.myData)
        this.csvRecords = result
        this.dataService.dataset$.next(result)
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
      
  }



  

  uploadVar(){

    let newD =[]

    let name = this.csvRecords[0][10]

    let a = this.csvRecords.filter((d,i)=>{
        return i != 0;
      })
    let b =  a.map(function(v,i2){

      newD[i2] = v[10]

    })

    let newVar = {nom : name,data : newD}

    this.dataService.createVar(newVar).subscribe()
  }

  
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
  


@Component({
  selector: 'dialog-content',
  templateUrl: 'popup_dd.html',
})
export class Dialogdd {
  fileName$: Observable<string>;
  constructor(
    private store:Store,
    public dialogRef: MatDialogRef<Dialogdd>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.store.pipe(select(selectFileName_dd)).subscribe((data)=>{
        if(data != ''){

          this.dialogRef.close()
        }

      })
      
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
