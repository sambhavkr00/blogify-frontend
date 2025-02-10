import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _userDataSource = new BehaviorSubject<any>(null);
  user$ = this._userDataSource.asObservable();

  constructor() {}

  updateUser(user: any) {
    this._userDataSource.next(user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  getUserName(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : 'User';
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user._id;
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
}
