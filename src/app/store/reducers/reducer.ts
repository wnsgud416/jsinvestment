import {createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as StoreActions from '../actions/action'

export const ReducerKey = 'Datasource';
export class DatasourceState{
}
export interface State extends EntityState<DatasourceState> {
  datasources;
}
export const adapter: EntityAdapter<DatasourceState> = createEntityAdapter<DatasourceState>({
});

export const initialState: State = adapter.getInitialState({
  datasources: null,
});

const ConnectorReducer = createReducer(
  initialState,
  // on(StoreActions.loginSuccess, (state, action) =>
  // adapter.setAll([], {
  //   ...state, tables: null,
  // })
  // ),
)

export function reducer(state: State | undefined, action: Action) {
  return ConnectorReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
