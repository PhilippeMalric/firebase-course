import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, throwError } from 'rxjs';
import { catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Dataset_Stats } from 'src/app/model/dataset';
import { DataService } from 'src/app/services/data.service';
import { DatasetsService } from 'src/app/services/dataset.service';
import { addData, clearSVGoff, clearSVGon, decrement, increment, updateCategories, updatedd } from '../actions/main.actions';
import { selectall } from '../reducers';




@Injectable()
export class MainEffects {



  constructor(
    private dataService:DataService,
    private store:Store,
    private actions$: Actions,
    private datasetsService:DatasetsService,
    private router: Router,
    ) {}

  clearActions$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Data clear] Add clear on"),
    tap(action => {
      this.store.dispatch(clearSVGoff({data:""}))
      console.log(action)
    }
      )
  ), { dispatch: false });

  newDsActions$ = createEffect(() =>
  this.actions$.pipe(
    ofType('[Data createDs] update createDs'),
    withLatestFrom(
      this.dataService.dataset$,
      this.dataService.variablesdd$,
      this.dataService.categories$,
      this.store.pipe(select(selectall))
    ),
    tap((data:any) => {
      console.log("createMetaData")

      console.log("data_from_effect",data)
      let newDataset:Partial<Dataset_Stats> = JSON.parse(JSON.stringify(data[0].data))
      newDataset.rowsCount =  data[1].length
      newDataset.variablesCount = data[1][0].length 
      this.datasetsService.createDataset(newDataset, newDataset.id)
      .pipe(
          tap(dataset => {

              console.log("Created new dataset: ", dataset);
              this.router.navigateByUrl("/datasets/"+newDataset.url);
          }),
          catchError(err => {
              console.log(err);
              alert("Could not create the dataset.");
              return throwError(err);
          })
      )
      .subscribe();

    }
      )
  ), { dispatch: false });

  updateDataActions$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Data List] Add Data"),
    withLatestFrom(this.store),
    tap(([action,store]:any)=> {
      
      if(!store.main.no_na || action["data"] != "NA"){
        //console.log("nona")
        this.dataService.modifieCategories(action["data"])
      }
      //console.log("action")
      //console.log(action["data"])
    }
      )
  ), { dispatch: false });

  stopIntervalActions$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Data stop Interval] update stop"),
    withLatestFrom(this.store),
    tap(([action,store]:any) => {
      console.log("store")
      console.log(store)
      clearInterval(store.main.interval)
      console.log("action stop")
      console.log(action["data"])
    }
      )
  ), { dispatch: false });

  updatedd$ = createEffect(() =>
  this.actions$.pipe(
    ofType("[Data updateCrossVar1] update updateCrossVar1","[Data updateCrossVar2] update updateCrossVar2"),
    withLatestFrom(this.store),
    tap(([action,store]:any) => {
      this.store.dispatch(updatedd({data:1}))
    }
      )
  ), { dispatch: false });

}
