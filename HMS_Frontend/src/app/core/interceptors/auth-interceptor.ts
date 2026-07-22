import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';

import { Router } from '@angular/router';

import {
  Observable,
  throwError
} from 'rxjs';

import {
  catchError,
  switchMap
} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Always send cookies with every request
    const request = req.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        // Don't try to refresh if refresh endpoint itself failed
        if (
          error.status === 401 &&
          !request.url.includes('/api/auth/refresh')
        ) {
          return this.refreshToken(request, next);
        }

        return throwError(() => error);

      })

    );

  }

  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.http.post(
      'http://localhost:5000/api/auth/refresh',
      {},
      {
        withCredentials: true
      }
    ).pipe(

      switchMap(() => {
        // Retry the original request.
        // The browser will automatically send the new accessToken cookie.
        return next.handle(
          request.clone({
            withCredentials: true
          })
        );
      }),

      catchError((error) => {

        // Refresh token expired or invalid
        this.router.navigate(['/login']);

        return throwError(() => error);

      })

    );

  }

}