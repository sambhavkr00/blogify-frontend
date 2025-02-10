import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blogpost.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blogpost.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  blogPosts: BlogPost[] = [];
  isLoggedIn = false;
  userName = '';
  firstName = '';

  constructor(
    private _blogService: BlogService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this._blogService.getAllBlogs().subscribe((data) => {
      this.blogPosts = data;
    });

    this._dataService.user$.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;

        if (user) {
          this.userName = this._dataService.getUserName().trim();
          this.firstName = this.userName.split(' ')[0];
        } else {
          this.firstName = 'There';
        }
      },
    });
  }
}
