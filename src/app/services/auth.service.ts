import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private _dataService: DataService) {}

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + 'auth/login', {
      email,
      password,
    });
  }
  signup(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + 'auth/signup', {
      name,
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this._dataService.updateUser(null);
  }

  authenticate(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this._dataService.updateUser(JSON.parse(user));
    }
  }
}
