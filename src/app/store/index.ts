import {ActionReducer,ActionReducerMap,createFeatureSelector,createSelector,MetaReducer,} from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromconnect from './reducers/reducer';

export interface AppState {
  [fromconnect.ReducerKey]: fromconnect.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromconnect.ReducerKey]: fromconnect.reducer
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [debug]
  : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
