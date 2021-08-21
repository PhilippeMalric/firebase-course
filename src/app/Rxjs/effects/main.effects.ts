import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addData, clearSVGoff, clearSVGon, decrement, increment, updateCategories, updatedd } from '../actions/main.actions';




@Injectable()
export class MainEffects {



  constructor(
    private dataService:DataService,
    private store:Store,
    private actions$: Actions
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
