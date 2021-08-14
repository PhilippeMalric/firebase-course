import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, take, tap, withLatestFrom } from 'rxjs/operators';
import { addData, updateFocusVar, updateInterval, updateVarName } from '../actions/main.actions';
import { selectDataset, selectFileName, selectForStream, selectInterval, selectVarNames } from '../reducers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'stat-div',
  templateUrl: './stat-div.component.html',
  styleUrls: ['./stat-div.component.css']
})
export class StatDivComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  varNames: any;
  currentIndex: number;
  interval:any
  fileName$: Observable<unknown>;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == "m"){
      this.findNextVar()
      this.createStat()
    }
    console.log(event.key)
  }

  constructor(
    private dataService:DataService,
    private store:Store
  ) { }

  ngOnInit(): void {

    this.currentIndex = 0

    this.fileName$ = this.store.pipe(select(selectFileName))

    this.dataService.dataset$.subscribe((data)=>{

    if(data && data.length > 0){
      this.options = data[0]
      this.varNames = data[0]
      this.filteredOptions = this.myControl.valueChanges.pipe(
     
      startWith(''),
      map((value:any) =>{

        if(this.varNames.includes(value) ){
          this.currentIndex = this.varNames.indexOf(value)
        }

        return this._filter(value)
        
      } )
    );
    }
    
})

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  findNextVar = ()=>{

console.log("varNames",this.varNames,this.currentIndex)

    if(this.currentIndex < this.varNames.length){
      this.currentIndex = this.currentIndex +1
      this.myControl.setValue(this.varNames[this.currentIndex])

      //return this.options2[this.currentIndex++]

    }else{
      this.currentIndex = this.currentIndex +1
      this.myControl.setValue(this.varNames[this.currentIndex])

      //return this.options2[this.currentIndex--]

    
    }


  }

  createStat = ()=>{
    

    console.log("stat1")

    this.store.dispatch(updateVarName({data:this.myControl.value}))

    this.dataService.dataset$.pipe(take(1),
      tap(console.log)
      )
      
      .subscribe((dataset:any)=>{
              
             this.stat(dataset)
                })
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

        stat = (dataset)=>{
          console.log("stat2")
          //console.log(varNames.includes(this.myControl.value))
          if(dataset[0].includes(this.myControl.value)){
            this.store.dispatch(updateFocusVar({data:this.myControl.value}))
            let n = dataset[0].indexOf(this.myControl.value)
            console.log( "n" )
            console.log( n )
            let col = dataset.map(x=>x[n])
            console.log("col", col )
            this.createStatDesc(col)
          }
             
            
        }
        createStatDesc = (col)=>{
          console.log("length")
          console.log(col.length)
          let stat_desc = this.createCount(col)
          console.log("stat_desc ------------------------------------")
          console.log(stat_desc)
            this.dataService.categories$.next(stat_desc)


        }


    createCount(arr){
        if(arr[1].split(" ")[0].split("-").length > 2 ){
          arr = arr.map(x=>x.split(" ")[0])

        }
      var counts = {};
      for (var i = 1; i < arr.length; i++) {
          counts[arr[i]] = 1 + (counts[arr[i]] || 0);
      }

      let result = Object.keys(counts).sort().map((key)=>{
        return {categorie:key,count:counts[key]}
      })

      return result
    }

}

