import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMain from './main.reducer';





export interface  MetaInfo {
  nrow: number;
  ncol:number;
  varName:string[]
}

export interface  FileState {
  fileName: string;
  size:string;
  metaInfo: MetaInfo
}


export const selectDataset = (state: any) => state.main.dataset;
export const selectData = (state: any) => state.main.data;
export const selectCategories = (state: any) => state.main.categories;

export const selectInterval = (state: any) => state.main.interval;

export const selectFileState = (state: any) => state.main.fileState;
export const selectFileName = createSelector(
  selectFileState,
  (state: FileState) => state.fileName
);

export const selectVarNames = createSelector(
  selectFileState,
  (state: FileState) => state.metaInfo.varName
);


export const selectForStream = createSelector(
  selectInterval,
  selectVarNames,
  (interval,varNames) => ({ interval,varNames }),
)





export interface State {

  [fromMain.mainFeatureKey]: fromMain.MainState;
}

export const reducers: ActionReducerMap<State> = {

  [fromMain.mainFeatureKey]: fromMain.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
