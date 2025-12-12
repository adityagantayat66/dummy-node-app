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
}
