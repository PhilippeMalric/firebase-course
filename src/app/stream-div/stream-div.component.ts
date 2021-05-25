import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, take, tap, withLatestFrom } from 'rxjs/operators';
import { addData, updateInterval } from '../actions/main.actions';
import { selectDataset, selectFileName, selectForStream, selectInterval, selectVarNames } from '../reducers';
import { DataService } from '../services/data.service';

@Component({
  selector: 'stream-div',
  templateUrl: './stream-div.component.html',
  styleUrls: ['./stream-div.component.css']
})
export class StreamDivComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  varNames: any;
  currentIndex: number;
  interval:any
  fileName$: Observable<unknown>;

  constructor(
    private dataService:DataService,
    private store:Store
  ) { }

  ngOnInit(): void {


    this.fileName$ = this.store.pipe(select(selectFileName))

    this.dataService.dataset$.subscribe((data)=>{

  if(data && data.length > 0){
    this.options = data[0]
    this.filteredOptions = this.myControl.valueChanges.pipe(
          
    startWith(''),
    map(value => this._filter(value))
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


  stopStream = ()=>{

    this.store.pipe(
      take(1),
      select(selectInterval),
      tap((interval:any)=>{
        if(interval != 0 ){
          clearInterval(interval)
        }
      })
    ).subscribe()
    
  }

  createStream = ()=>{
    this.currentIndex = 0

    console.log("stream1")

    this.store.pipe(
      take(1),
      select(selectForStream),
      withLatestFrom(this.dataService.dataset$),
      tap(console.log)).subscribe(([{interval,varNames},dataset]:any)=>{
              if(interval != 0 ){
                clearInterval(interval)
              }
              //console.log("stream")
              //console.log(this.myControl.value,varNames)

             this.stream(varNames,dataset)
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

        stream = (varNames,dataset)=>{
          console.log("stream2")
          //console.log(varNames.includes(this.myControl.value))
          if(varNames.includes(this.myControl.value)){
            let n = varNames.indexOf(this.myControl.value)
        
                let col = dataset.map(x=>x[n])
                let sArray = this.shuffle(col)
                this.currentIndex = 0
                //console.log( sArray )
                this.interval = this.createInterval(sArray)
                this.store.dispatch(updateInterval({data:this.interval}))
              }
             
            
        }
        createInterval = (sArray)=>{
          console.log(this.currentIndex)
          console.log(sArray.length)
          let newInterval = setInterval(()=>{

            //console.log(this.currentIndex)
            if(this.currentIndex < sArray.length){
              //console.log(sArray[this.currentIndex])
              this.store.dispatch(addData({data:sArray[this.currentIndex]}) )
              //this.dataService.mainVar$.next(sArray[this.currentIndex])
              this.currentIndex++
            }else{
              clearInterval(this.interval)
            }
            },100)
            console.log(newInterval )
          return newInterval 
        }
}

