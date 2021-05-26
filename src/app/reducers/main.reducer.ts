import { Action, createReducer, on } from '@ngrx/store';
import { FileState } from '.';

import { addData, clearSVGoff, clearSVGon, decrement, increment, stopInterval, updateCategories, updateData, updateFileMeta, updateFileName, updateFileName_map, updateFileSize, updateInterval, updateNo_na } from '../actions/main.actions';


export const mainFeatureKey = 'main';

export interface MainState {
  data: string;
  no_na:boolean;
  clearState:boolean,
  categories:any,
  fileState:FileState,
  interval:Number,
  dataSet:any[],
  fileName_map:string
}


export const initialState: MainState = {
  data: "**booting**",
  no_na:false,
  dataSet:[],
  clearState:false,
  categories:{},
  fileState:{
    fileName:"",
    size:"",
    metaInfo:{
      nrow:0,
      ncol:0,
      varName:[]
    }
  },
  interval:0,
  fileName_map:""
};




const mainReducer = createReducer(
initialState,
on(clearSVGon, state => ({ ...state, clearState: true })),
on(clearSVGoff, state => ({ ...state, clearState: false })),
on(increment, state => ({ ...state, data: "" })),
on(decrement, state => ({ ...state, data: "" })),
on(addData, (state, { data }) => {
  //console.log("reducer")
  //console.log(data)

  if(!state.no_na || data != "NA"){
    return { ...state, data: data }
  }
  else{
    return { ...state}
  }
  
}),
on(updateCategories, (state, { data }) => {
  console.log("categories")
  console.log(data)
  return { ...state, categories: data }
}),
on(updateFileName, (state, { data }) => {
  console.log("updateFileName")
  console.log(data)
  return { ...state, fileState: {...state.fileState,fileName:data} }
}),
on(updateFileSize, (state, { data }) => {
  console.log("updateFileSize")
  console.log(data)
  return { ...state, fileState: {...state.fileState,size:data} }
}),
on(updateFileMeta, (state, { data }) => {
  console.log("updateFileMeta")
  console.log(data)
  return { ...state, fileState: {...state.fileState,metaInfo:data} }
}),
on(updateInterval, (state, { data }) => {
  console.log("updateInterval")
  console.log(data)
  return { ...state, interval:data }
}),
on(stopInterval, (state, { data }) => {
  console.log("stopInterval")
  console.log(data)
  return { ...state}
}),
on(updateNo_na, (state, { data }) => {
  console.log("updateNo_na")
  console.log(data)
  return { ...state,no_na:data}
}),
on(updateFileName_map, (state, { data }) => {
  console.log("updateFileName_map")
  console.log(data)
  return { ...state,fileName_map:data}
})





)
export function reducer(state: MainState | undefined, action: Action) {
  return mainReducer(state, action);
}