import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  alert = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _dataService: DataService,
    private _router: Router
  ) {
    // Initializing login form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.alert = 'Please fill all fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this._authService.login(email, password).subscribe({
      next: (res: any) => {
        const { token, user } = res;

        // Save token to localStorage
        localStorage.setItem('token', token);

        // Update user data
        this._dataService.updateUser(user);

        // Navigate to home page
        this._router.navigate(['/']);
      },
      error: (err) => {
        if (err.status == 404) {
          this.alert = 'User not found. Please Signup first.';
          // this._router.navigate(['/']);
        }

        if (err.status == 401) {
          this.alert = 'Invalid credentials. Please try again.';
        }
      },
    });
  }
}
