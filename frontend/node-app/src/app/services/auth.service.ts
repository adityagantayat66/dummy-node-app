import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(regFormData: FormData): Observable<any>
  {
    return this._http.post('http://localhost:5000/api/register', regFormData);
  }
  login(loginFormData: FormData): Observable<any>
  {
    return this._http.post('http://localhost:5000/api/login', loginFormData);
  }
  testMiddleware(): Observable<any>
  {
    return this._http.get('http://localhost:5000/api/test');
  }
  storeToken(data: any): void
  {
    localStorage.setItem('access_id', data.token);
    localStorage.setItem('role', data.role)
  }
}
