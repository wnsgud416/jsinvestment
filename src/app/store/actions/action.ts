import { createAction, props } from '@ngrx/store';

//test
export const userDelete = createAction(
  '[Data Source] userDelete',
  props<{id}>()
)
export const userDeleteSuccess = createAction(
  '[Data API] userDelete Success',
  props<{result}>()
)
export const userDeleteFail = createAction(
  '[Data API] userDelete Fail',
  props<{error: any}>()
)
