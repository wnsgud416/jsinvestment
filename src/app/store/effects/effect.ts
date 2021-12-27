import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actionservice } from 'src/app/service/actionservice';
import * as StoreActions from "../actions/action";

@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private actionService: Actionservice
  ) { }

  cmdTest$ = createEffect(() => this.actions$.pipe(
    ofType(StoreActions.cmdTest),
    mergeMap((action) => this.actionService.cmdTest(action.stockCodeArray).pipe(
      map(data => ({ type: '[Data API] cmdTest Success', result : data})),
      catchError(() => of({ type: '[Data API] cmdTest Fail'}))
    ))
  ))

  userDelete$ = createEffect(() => this.actions$.pipe(
    ofType(StoreActions.userDelete),
    mergeMap((action) => this.actionService.userDelete(action.id).pipe(
      map(data => ({ type: '[Data API] userDelete Success', result : data})),
      catchError(() => of({ type: '[Data API] userDelete Fail'}))
    ))
  ))


}
