import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Service } from 'src/app/service/service';
import * as StoreActions from "../actions/action";

@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private javaservice: Service
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(StoreActions.login),
    mergeMap((action) => this.javaservice.login(action.id,action.passwd).pipe(
      map(data => ({ type: '[Data API] login Success', result : data})),
      catchError(() => of({ type: '[Data API] login Fail'}))
    ))
  ))


}
