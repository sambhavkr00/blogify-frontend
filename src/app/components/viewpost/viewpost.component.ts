import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, Comment } from 'src/app/models/blogpost.model';
import { BlogService } from 'src/app/services/blogpost.service';
import { DataService } from 'src/app/services/data.service';
import { CommentResponse } from 'src/app/models/responses.model';

@Component({
  selector: 'app-post',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css'],
})
export class ViewPostComponent implements OnInit {
  blogPost!: BlogPost;
  comments: Comment[] = [];
  newCommentContent: string = '';
  postId!: string;
  alert = '';
  isLoggedIn = false;

  constructor(
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.postId = params.get('postId')!;

      if (this.postId) {
        this._blogService.getBlogById(this.postId).subscribe((data) => {
          this.blogPost = data;

          this.comments = data.comments || [];
          console.log(this.comments);
        });
      }
    });

    this._dataService.user$.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
      },
    });
  }

  addComment() {
    if (!this.newCommentContent.trim()) {
      this.alert = 'Comment cannot be empty';
      return;
    }

    const user = this._dataService.getUser();
    const newComment: Comment = {
      user,
      post: this.blogPost,
      content: this.newCommentContent,
    };
    this._blogService
      .addCommentOnPost(this.postId, newComment)
      .subscribe((res: CommentResponse | any) => {
        console.log(res);
        const { message, comments } = res;
        this.comments = comments;
        this.newCommentContent = '';
      });
  }
}
