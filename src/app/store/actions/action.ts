import { createAction, props } from '@ngrx/store';

//CMD TEST
export const cmdTest = createAction(
  '[Data Source] cmdTest'
)
export const cmdTestSuccess = createAction(
  '[Data API] cmdTest Success',
  props<{result}>()
)
export const cmdTestFail = createAction(
  '[Data API] cmdTest Fail',
  props<{error: any}>()
)

//유저 삭제
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
