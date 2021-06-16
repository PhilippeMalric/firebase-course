import { createAction, props } from '@ngrx/store';

export const loadMains = createAction(
  '[Main] Load Mains'
);

export const loadMainsSuccess = createAction(
  '[Main] Load Mains Success',
  props<{ data: any }>()
);

export const loadMainsFailure = createAction(
  '[Main] Load Mains Failure',
  props<{ error: any }>()
);

export const addData = createAction(
  '[Data List] Add Data',
  props<{ data:any }>()
);

export const clearSVGon = createAction(
  '[Data clear] Add clear on',
  props<{ data:any }>()
);
export const clearSVGoff = createAction(
  '[Data clear] Add clear off',
  props<{ data:any }>()
);

export const updateCategories = createAction(
  '[Data update Cat] update Cat',
  props<{ data:any }>()
);

export const updateFileName = createAction(
  '[Data update FileName] update FileName',
  props<{ data:any }>()
);

export const updateFileSize = createAction(
  '[Data update FileSize] update FileSize',
  props<{ data:any }>()
);

export const updateFileMeta = createAction(
  '[Data update FileMeta] update FileMeta',
  props<{ data:any }>()
);

export const updateInterval = createAction(
  '[Data update Interval] update Interval',
  props<{ data:any }>()
);

export const stopInterval = createAction(
  '[Data stop Interval] update stop',
  props<{ data:any }>()
);

export const updateData = createAction(
  '[Data updateData] updateData',
  props<{ data:any }>()
);

export const updateNo_na = createAction(
  '[Data updateNoNA] update NO NA',
  props<{ data:any }>()
);

export const updateFileName_map = createAction(
  '[Data FileName_map] update FileName_map',
  props<{ data:any }>()
);

export const updateFileName_dd = createAction(
  '[Data FileName_dd] update FileName_dd',
  props<{ data:any }>()
);
export const updateFocusVar = createAction(
  '[Data FocusVar] update FocusVar',
  props<{ data:any }>()
);
export const updateVarName = createAction(
  '[Data updateVarName] update VarName',
  props<{ data:any }>()
);

export const updateCrossVar = createAction(
  '[Data updateCrossVar] update updateCrossVar',
  props<{ data:any }>()
);
export const updateCrossVar1 = createAction(
  '[Data updateCrossVar1] update updateCrossVar1',
  props<{ data:any }>()
);
export const updateCrossVar2 = createAction(
  '[Data updateCrossVar2] update updateCrossVar2',
  props<{ data:any }>()
);
export const updatedd = createAction(
  '[Data updatedd] update updatedd',
  props<{ data:any }>()
);


export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');