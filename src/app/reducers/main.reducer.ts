import { Action, createReducer, on } from '@ngrx/store';
import { addData, decrement, increment } from '../actions/main.actions';


export const mainFeatureKey = 'main';

export interface State {
  data: string;
}
export const initialState: State = {
  data: "**booting**"
};




const mainReducer = createReducer(
initialState,
on(increment, state => ({ ...state, data: "" })),
on(decrement, state => ({ ...state, data: "" })),
on(addData, (state, { data }) => {
  console.log("reducer")
  console.log(data)
  return { ...state, data: data }
}
  )
);
export function reducer(state: State | undefined, action: Action) {
  return mainReducer(state, action);
}