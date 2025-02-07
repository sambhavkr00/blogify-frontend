import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent {
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
      console.log('Updated Blog Data:', this.blogForm.value);
      alert('Blog updated successfully!');
      this._router.navigate(['/']);
    }
  }
}
