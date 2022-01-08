import { createAction, props } from '@ngrx/store';


//sendMessage
export const sendMessage = createAction(
  '[Data Source] sendMessage',
  props<{sendToken:any,messageText:any}>()
)
export const sendMessageSuccess = createAction(
  '[Data API] sendMessage Success',
  props<{result}>()
)
export const sendMessageFail = createAction(
  '[Data API] sendMessage Fail',
  props<{error: any}>()
)

//CMD TEST
export const cmdTest = createAction(
  '[Data Source] cmdTest',
  props<{stockCodeArray:any}>()
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
