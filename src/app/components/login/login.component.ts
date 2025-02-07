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
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this._authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login Successful:', res);
        const { token, user } = res;

        // Save token to localStorage
        localStorage.setItem('token', token);

        // Update user data
        this._dataService.updateUser(user);

        // Navigate to home page
        this._router.navigate(['/mydrafts']);
      },
      error: (err) => console.log('Login Error:', err),
    });
  }
}
