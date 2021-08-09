import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateddCatCode, updateddCatLabel, updateddCatVarName, updateddVarDesc, updateddVarName, updateFileName_dd } from '../actions/main.actions';
import { selectFileName_dd } from '../reducers';
import { DataService } from '../services/data.service';
import * as XLSX from "xlsx"
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';


@Component({
  selector: 'load-csv-dd',
  templateUrl: './load-csv_dd.component.html',
  styleUrls: ['./load-csv_dd.component.css']
})
export class LoadCSV_ddComponent implements OnInit {


  csvRecords: any[] = [];
  header = false;
  currentIndex: number;
  interval:any
  fileName:Observable<String>
  options: any;
  arrayBuffer: any;
  filelist: any[];
  form: any;

  

  constructor(
    private fb: FormBuilder,
    private dataService:DataService,
    private store:Store) {
      this.store.pipe(take(1)).subscribe((data:any)=>{

      console.log("in_popup dd",data)
      this.form = this.fb.group({
        description: [data.main.ddVarName, Validators.required],
        varName: [data.main.ddVarDesc, Validators.required],
        catVarName: [data.main.ddCatVarName, Validators.required],
        catCode: [data.main.ddCatCode, Validators.required],
        catLabel: [data.main.ddCatLabel, Validators.required]
      });

      this.form.get("description").valueChanges.subscribe(x => {
        console.log('description')
        console.log(x)
        this.store.dispatch(updateddVarDesc({data:x}))
        })

      this.form.get("varName").valueChanges.subscribe(x => {
        console.log('varName')
        console.log(x)
        this.store.dispatch(updateddVarName({data:x}))
      })


      this.form.get("catVarName").valueChanges.subscribe(x => {
        console.log('catVarName')
        console.log(x)
        this.store.dispatch(updateddCatVarName({data:x}))
      })  

      this.form.get("catCode").valueChanges.subscribe(x => {
        console.log('ddCatCode')
        console.log(x)
        this.store.dispatch(updateddCatCode({data:x}))
        })
      
      this.form.get("catLabel").valueChanges.subscribe(x => {
        console.log('catLabel')
        console.log(x)
        this.store.dispatch(updateddCatLabel({data:x}))
        })

  })
 

  }



  @ViewChild('csvReader', { static: false }) fileImportInput: any;

  ngOnInit(){
    
    this.fileName = this.store.pipe(select(selectFileName_dd))
  }
  

  // Your applications input change listener for the CSV File
  uploadListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;
    //console.log('files', files);
    if(files.length > 0 ){
      this.store.dispatch(updateFileName_dd({data:files[0].name}))
      //this.store.dispatch(updateFileSize({data:formatBytes(files[0].size)}))
      let fileReader = new FileReader();    
      fileReader.readAsArrayBuffer(files[0]);     
      fileReader.onload = (e) => {    
          this.arrayBuffer = fileReader.result;    
          var data = new Uint8Array(this.arrayBuffer);    
          var arr = new Array();    
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
          var bstr = arr.join("");    
          var workbook = XLSX.read(bstr, {type:"binary"});    
          var first_sheet_name = workbook.SheetNames[0];    
          var worksheet_var = workbook.Sheets[first_sheet_name]; 
          let variables = XLSX.utils.sheet_to_json(worksheet_var,{raw:true})

          console.log("variables");
          console.log(variables);
          this.dataService.variablesdd$.next(variables)
          var sec_sheet_name = workbook.SheetNames[1];    
          var worksheet_cat = workbook.Sheets[sec_sheet_name];  
          let categories = XLSX.utils.sheet_to_json(worksheet_cat,{raw:true})  
          console.log(categories);   
          this.dataService.categoriesdd$.next(categories)
      }    
    }
    // Parse the file you want to select for the operation along with the configuration
    
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
  


