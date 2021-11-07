import { createAction, props } from '@ngrx/store';

//test
export const login = createAction(
  '[Data Source] login',
  props<{id,passwd}>()
)
export const loginSuccess = createAction(
  '[Data API] login Success',
  props<{result}>()
)
export const loginFail = createAction(
  '[Data API] login Fail',
  props<{error: any}>()
)
