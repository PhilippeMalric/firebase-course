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

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');