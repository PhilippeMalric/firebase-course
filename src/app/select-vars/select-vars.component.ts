import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { updateCrossVar, updateCrossVar1, updateCrossVar2 } from '../actions/main.actions';
import { DdVarNameComponent } from '../dd/dd-var-name/dd-var-name.component';
import { selectCrossVar1, selectCrossVar2, selectFileName } from '../reducers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'select-vars',
  templateUrl: './select-vars.component.html',
  styleUrls: ['./select-vars.component.css']
})
export class SelectVarsComponent implements OnInit {
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  options1: string[] = [];
  options2: string[] = [];
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  varNames: any;
  currentIndex: number;
  interval:any
  fileName$: Observable<unknown>;
  crossVar1$: Observable<any>;
  crossVar2$: Observable<any>;

  @ViewChild("var1", { read: ViewContainerRef }) var1;
  @ViewChild("var2", { read: ViewContainerRef }) var2;
  varNames1: any;
  varNames2: any;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == "m"){
      this.findNextVar()
    }
    console.log(event.key)
  }
  constructor(
    private resolver: ComponentFactoryResolver,
    private dataService:DataService,
    private store:Store
  ) { 


  }

  ngOnInit(): void {


    this.fileName$ = this.store.pipe(select(selectFileName))

    this.dataService.dataset$.subscribe((data)=>{

        console.log(data)

      this.options1 = data[0]
      if(data && data.length > 0){
        this.varNames = data[0]
        this.options1 = data[0]
        this.options2 = data[0]
        this.filteredOptions1 = this.myControl1.valueChanges.pipe(
          startWith(''),
          map((data)=>{
            console.log(data)
            //this.currentIndex = data.toLowerCase().indexOf(this.options1)
            this.store.dispatch(updateCrossVar1({data}))
            return this._filter1(data)
          })
        );
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
            startWith(''),
            map((data:any)=>{
              console.log("data--------------------------")
              document["data5"] = data
              document["dataV"] = this.varNames
              console.log(data)
              console.log(this.varNames)
              console.log(this.varNames.indexOf(data))
              if(data){
                this.currentIndex = this.varNames.indexOf(data)
                this.store.dispatch(updateCrossVar2({data}))
              }
              return this._filter2(data)
            })
          );
      }
      
    
    })

    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      map((data)=>this._filter1(data))
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
        map((data)=>this._filter2(data))
      );
 
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(this.options1){
      return this.options1.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }else{
      return []
    }
     }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(this.options1){
      return  this.options2.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }else{
      return []
    }
    }

    change = ()=>{
      let data1=this.myControl1.value
      let data2=this.myControl2.value
      this.store.dispatch(updateCrossVar({data:[data1,data2]}))
        this._filter1(data1)
        this._filter2(data2)
    }
    findNextVar = ()=>{

      if(this.currentIndex < this.varNames.length){
        this.currentIndex = this.currentIndex +1
        this.myControl2.setValue(this.varNames[this.currentIndex])

        //return this.options2[this.currentIndex++]

      }else{
        this.currentIndex = this.currentIndex +1
        this.myControl2.setValue(this.varNames[this.currentIndex])

        //return this.options2[this.currentIndex--]

      
      }


    }

}
