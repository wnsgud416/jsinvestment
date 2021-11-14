import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class Actionservice {

  constructor(private http: HttpClient) {
  }

  login(id, passwd) {
    // const headers = { 'content-type': 'application/json' }
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const data = { id: id, passwd:passwd}
    const body = JSON.stringify(data)

    return this.http.post("/action/login", body,{headers, responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(()=>
      'Something bad happened; please try again later.');
  }


}
