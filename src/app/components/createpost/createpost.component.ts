import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogPost, Author } from 'src/app/models/blogpost.model';
import { BlogService } from 'src/app/services/blogpost.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent implements OnInit {
  blogForm: FormGroup;
  user: Author | null = null;
  categories: any = [];

  constructor(
    private _fb: FormBuilder,
    private _blogService: BlogService,
    private _dataService: DataService,
    private _router: Router
  ) {
    this.blogForm = this._fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: this._fb.array([]),
      tags: [[]],
      media: [],
    });
  }

  ngOnInit() {
    this.user = this._dataService.getUser();
    this._blogService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCheckboxChange(event: any, item: any) {
    const selectedItems = this.blogForm.get('categories') as FormArray;

    if (event.target.checked) {
      selectedItems.push(this._fb.control(item._id));
    } else {
      const index = selectedItems.controls.findIndex(
        (ctrl) => ctrl.value === item._id
      );
      selectedItems.removeAt(index);
    }
  }

  publish(isPublished: boolean) {
    if (this.blogForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (this.blogForm.value.media) {
      let image = this.blogForm.value.media.split('C:\\fakepath\\')[1];
      this.blogForm.value.media = [`${image}`];
    }

    const tags =
      typeof this.blogForm.value.tags === 'string'
        ? this.blogForm.value.tags.split(',').map((tag: string) => tag.trim())
        : Array.isArray(this.blogForm.value.tags)
        ? this.blogForm.value.tags
        : [];

    const blogData: BlogPost = {
      author: this.user!,
      title: this.blogForm.value.title,
      content: this.blogForm.value.content,
      categories: this.blogForm.value.categories,
      tags: tags,
      media: this.blogForm.value.media,
      isPublished: isPublished,
    };

    this._blogService.createBlog(blogData).subscribe({
      next: (res) => {
        this.blogForm.reset();
        this._router.navigate(['/']);
      },
      error: (err) => {
        if (err.status == 400) {
          alert('Post not created');
        }
      },
    });
  }
}
