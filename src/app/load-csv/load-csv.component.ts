import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Observable } from 'rxjs';
import { map, startWith, timeInterval } from 'rxjs/operators';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-load-csv',
  templateUrl: './load-csv.component.html',
  styleUrls: ['./load-csv.component.css']
})
export class LoadCSVComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  csvRecords: any[] = [];
  header = false;
  currentIndex: number;
  interval:any

  constructor(private ngxCsvParser: NgxCsvParser,private dataService:DataService) {
  }

  @ViewChild('csvReader', { static: false }) fileImportInput: any;

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // Your applications input change listener for the CSV File
  uploadListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        console.log('Result', result);

        this.options = result[0]
        this.filteredOptions = this.myControl.valueChanges.pipe(
          
          startWith(''),
          map(value => this._filter(value))
        );
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
      
  }

  printValue = ()=>{

    console.log(this.myControl.value)
  }

  stopStream = ()=>{
    if(this.interval){
      clearInterval(this.interval)
    }
  }

  createStream = ()=>{
    if(this.interval){
      clearInterval(this.interval)
    }
   
    if(this.csvRecords){
      let varNames:String[] = this.csvRecords[0]
      if(varNames.includes(this.myControl.value)){
        let n = varNames.indexOf(this.myControl.value)
        let col = this.csvRecords.map(x=>x[n])

        let sArray = this.shuffle(col)
        this.currentIndex = 0
        this.interval = setInterval(()=>{
        if(this.currentIndex < sArray.length){
          this.dataService.mainVar$.next(sArray[this.currentIndex])
          this.currentIndex++
        }else{
          clearInterval(this.interval)
        }
          

        },100)
        this.dataService.mainVar$.next
      }
      else{

      }
 
    }
    else{

    }
    
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

   shuffle = (array):any[]=>{
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
}


  


