import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Observable } from 'rxjs';
import { map, startWith, tap, timeInterval } from 'rxjs/operators';
import { selectFileName_map } from 'src/app/Rxjs/reducers';
import { DataService } from 'src/app/services/data.service';
import { addData, updateData, updateFileMeta, updateFileName, updateFileName_map, updateFileSize } from 'src/app/Rxjs/actions/main.actions';



@Component({
  selector: 'load-csv-map',
  templateUrl: './load-csv_map.component.html',
  styleUrls: ['./load-csv_map.component.css']
})
export class LoadCSV_mapComponent implements OnInit {


  csvRecords: any[] = [];
  header = false;
  currentIndex: number;
  interval:any
  fileName:Observable<String>
  options: any;


  constructor(
    private ngxCsvParser: NgxCsvParser,
    private dataService:DataService,
    private store:Store) {
  }

  @ViewChild('csvReader', { static: false }) fileImportInput: any;

  ngOnInit(){
    
    this.fileName = this.store.pipe(select(selectFileName_map))
  }
  

  // Your applications input change listener for the CSV File
  uploadListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;
    console.log('files', files);
    if(files.length > 0 ){
      this.store.dispatch(updateFileName_map({data:files[0].name}))
      //this.store.dispatch(updateFileSize({data:formatBytes(files[0].size)}))

    }
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        //console.log('Result', result);

        this.options = result[0]

        let meta = {
          nrow:result.length,
          ncol:this.options.length,
          varName:this.options
        }
        console.log(meta)
        //this.store.dispatch(updateFileMeta({data:meta}))
      
        this.dataService.datasetSVG$.next(result)
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
      
  }



  

  uploadVar(){

    let newD =[]

    let name = this.csvRecords[0][9]

    let a = this.csvRecords.filter((d,i)=>{
        return i != 0;
      })
    let b =  a.map(function(v,i2){

      newD[i2] = v[9]

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
  


