import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent {
  blogForm: FormGroup;

  constructor(private _fb: FormBuilder, private _router: Router) {
    this.blogForm = this._fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      console.log('Form Data:', this.blogForm.value);
      alert('Blog submitted successfully!');
      this._router.navigate(['/']);
    }
  }
}
