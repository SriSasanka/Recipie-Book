import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


export  class LoggingInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest , next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        console.log('logging Interceptor' , event);
      }
    );
  }
}
