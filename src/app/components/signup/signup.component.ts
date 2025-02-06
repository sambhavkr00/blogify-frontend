import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
    private _router: Router
  ) {}
  signup() {
    let name = 'Sambhav';
    let email = 'kumarsambhav00@gmail.com';
    let password = '123456789';

    this._authService.signup(name, email, password).subscribe({
      next: (res: any) => {
        console.log(res);
        // res will contain token and user
        // save these to local storage
        // update user subject in userservice
        let { token, user } = res;
        localStorage.setItem('token', token);
        this._dataService.updateUser(user);
        // navigate to home page
        this._router.navigate(['/']);
      },
      error: (err) => console.log(err),
    });
  }
}
