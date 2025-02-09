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
  isSubmitting: boolean = false; // Prevent multiple submissions

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
      alert('Please fill all fields correctly.');
      return;
    }

    this.isSubmitting = true; // Disable button to prevent multiple requests

    const { name, email, password } = this.signupForm.value;

    this._authService.signup(name, email, password).subscribe({
      next: (res: any) => {
        if (res.message === 'User already exists') {
          this.isSubmitting = false;
          alert('User already exists. Please login.');
          this._router.navigate(['/']);
        } else {
          let { token, user } = res;
          localStorage.setItem('token', token);
          this._dataService.updateUser(user);
          alert('Signup Successful!');
          this._router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Signup failed. Please try again.');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
