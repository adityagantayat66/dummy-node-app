import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  if (req.url.toUpperCase().indexOf('LOGIN') === -1
      && req.url.toUpperCase().indexOf('REGISTER') === -1
      )
  {
    let accessToken = localStorage.getItem('access_id');
    req = req.clone({
      setHeaders: {
        Authorisation: `Bearer ${accessToken}`
      },
      withCredentials: true
    })
  }
  return next(req);
}
