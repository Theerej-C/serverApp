import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Status } from '../enum/status.enum';
import { CustomResponse } from '../Interface/custom-reponse';
import { Server } from '../Interface/server';

@Injectable({ providedIn: 'root' })
export class ServerService {


  private readonly apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  servers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      suscriber => {
        console.log(response);
        suscriber.next(
          status === Status.ALL ? { ...response, message: `Servers filetered by ${status} status ` }
            : {
              ...response,
              message: response.data.servers
                .filter(server => server.status === status).length > 0 ? `Servers filetered by
            ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status ` : `NO SERVER FOUND`,
              data: {
                servers: response.data.servers
                  .filter(server => server.status === status)
              }
            }
        );
        suscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );



  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An Error had happened -Error code:. ${error.status}`);
  }

}
