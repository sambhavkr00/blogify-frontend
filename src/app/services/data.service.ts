import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _userDataSource = new Subject<any>();
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
}
