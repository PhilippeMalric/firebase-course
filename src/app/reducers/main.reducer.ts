import { Action, createReducer, on } from '@ngrx/store';
import { FileState } from '.';

import { updateddCatLabel, updateddCatCode, updateddCatVarName, addData, clearSVGoff, clearSVGon, decrement, increment, stopInterval, updateCategories, updateCrossVar, updateCrossVar1, updateCrossVar2, updateCrossVarM, updateData, updatedd, updateddVarDesc, updateddVarName, updateFileMeta, updateFileName, updateFileName_dd, updateFileName_map, updateFileSize, updateFocusVar, updateInterval, updateNo_na, updateVarName } from '../actions/main.actions';


export const mainFeatureKey = 'main';



export interface VariableName {
  variable:string;
  texte_fr:string;

}

export interface CategorieName {
  title:string;
  texte_fr:string;
  code:string;

}

export interface DatasetState {
categorieName:CategorieName;
variableName:VariableName;
}




export interface MainState {
  data: string;
  no_na:boolean;
  clearState:boolean;
  categories:any;
  fileState:FileState;
  interval:Number;
  dataSet:any[];
  fileName_map:string;
  fileName_dd:string;
  focusVar:string;
  varName:string;
  crossVar:any;
  crossVarM:any;
  updatedd:Number;
  datasetState:DatasetState;
  ddVarName:string;
  ddVarDesc:string;
  ddCatVarName:string;
  ddCatCode:string;
  ddCatLabel:string;
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
  fileName_map:"",
  fileName_dd:"",
  focusVar:"",
  varName:"",
  crossVar:{"0":"","1":""},
  crossVarM:[],
  updatedd:0,
  datasetState:{
    categorieName:{
      title:"",
      texte_fr:"",
      code:""
    },
    variableName:{
      variable:"",
      texte_fr:""
    }
  },
  ddVarName:"name",
  ddVarDesc:"label:fr",
  ddCatVarName:"variable",
  ddCatCode:"name",
  ddCatLabel:"label:fr"
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
}),

on(updateFileName_dd, (state, { data }) => {
  console.log("updateFileName_dd")
  console.log(data)
  return { ...state,fileName_dd:data}
}),
on(updateFocusVar, (state, { data }) => {
  console.log("updateFocusVar")
  console.log(data)
  return { ...state,focusVar:data}
}),
on(updateVarName, (state, { data }) => {
  console.log("updateVarName")
  console.log(data)
  return { ...state,varName:data}
}),
on(updateCrossVar, (state, { data }) => {
  console.log("updateCrossVar")
  console.log(data)
  return { ...state,crossVar:data}
}),
on(updateCrossVar1, (state, { data }) => {
  console.log("updateCrossVar1")
  console.log(data)
  return { ...state,crossVar:{"0":data,"1":state.crossVar["1"]}}
}),
on(updateCrossVar2, (state, { data }) => {
  console.log("updateCrossVar2")
  console.log(data)
  return { ...state,crossVar:{"0":state.crossVar["0"],"1":data}}
}),
on(updatedd, (state, { data }) => {
  console.log("updatedd")
  console.log(data)
  return { ...state,updatedd:data}
}),
on(updateCrossVarM, (state, { data }) => {
  console.log("updateCrossVarM")
  console.log(data)
  return { ...state,crossVarM:data}
}),
on(updateddVarName, (state, { data }) => {
  console.log("updateCrossVarM")
  console.log(data)
  return { ...state,ddVarName:data}
}),
on(updateddVarDesc, (state, { data }) => {
  console.log("updateCrossVarM")
  console.log(data)
  return { ...state,ddVarDesc:data}
}),

on(updateddCatVarName, (state, { data }) => {
  console.log("updateCrossVarM")
  console.log(data)
  return { ...state,ddCatVarName:data}
}),
on(updateddCatCode, (state, { data }) => {
  console.log("updateddCatCode")
  console.log(data)
  return { ...state,ddCatCode:data}
}),
on(updateddCatLabel, (state, { data }) => {
  console.log("updateddCatLabel")
  console.log(data)
  return { ...state,ddCatLabel:data}
})


)
export function reducer(state: MainState | undefined, action: Action) {
  return mainReducer(state, action);
}