import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  alert = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _dataService: DataService,
    private _router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatpassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatpassword')?.value
      ? null
      : { mismatch: true };
  }

  signup() {
    if (this.signupForm.invalid) {
      this.alert = 'Please fill all fields correctly.';
      return;
    }

    const { name, email, password } = this.signupForm.value;

    this._authService.signup(name, email, password).subscribe({
      next: (res: any) => {
        let { token, user } = res;
        localStorage.setItem('token', token);
        this._dataService.updateUser(user);
        this._router.navigate(['/']);
      },
      error: (err) => {
        if (err.status == 409) {
          this.alert = 'User already exists. Please login.';
          return;
        }
        this.alert = 'Signup failed. Please try again.';
      },
    });
  }
}
