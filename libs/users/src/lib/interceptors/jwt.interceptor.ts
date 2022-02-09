import { LocalstorageService } from './../services/localstorage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  apiUrl = environment.apiUrl
  constructor(private ls: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.ls.getToken();
    if(token){
      request = this.addToken(request, token);

    }
    return next.handle(request).pipe(catchError((err)=>{
        return throwError(err)

    }))
  }

  private addToken(req: HttpRequest<any>,token:string){
    return  req.clone({
      setHeaders:{
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
