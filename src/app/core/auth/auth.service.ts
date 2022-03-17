import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

const API_URL = environment['api'];
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string) {
    return this.http
      .post(
        API_URL + 'users/login/',
        { username, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-acess-token');
          // window.localStorage.setItem('authToken' || '{}', authToken);
          console.log(`User ${username} authenticated with token ${authToken}`);
        })
      );
  }
}
