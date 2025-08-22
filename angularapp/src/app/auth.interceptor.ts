import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
 
  constructor() { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor called");
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Request Headers:', clonedRequest.headers);
      return next.handle(clonedRequest)
    //   .pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       console.error('Error occurred:', error);
    //       if (error.status === 403) {
    //         console.log("We have error because of Interceptor");
    //         console.error('We have an error ;Access forbidden. Check your token and permissions.');
    //       }
    //       return throwError(error);
    //     })
    //   );
    }
    return next.handle(req);
  }
}
 
 