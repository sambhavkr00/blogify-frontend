import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, BlogPost, Comment } from 'src/app/models/blogpost.model';
import { BlogService } from 'src/app/services/blogpost.service';
import { DataService } from 'src/app/services/data.service';
import { CommentResponse } from 'src/app/models/responses.model';

@Component({
  selector: 'app-post',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css'],
})
export class ViewPostComponent implements OnInit {
  blogPost: BlogPost = {
    title: '',
    content: '',
    author: {
      name: '',
      email: '',
    },
    isPublished: true,
  };
  comments: Comment[] = [
    {
      user: {
        name: '',
        email: '',
      },
      post: this.blogPost,
      content: '',
    },
  ];
  newCommentContent: string = '';
  postId!: string;
  alert = '';
  currentUser: Author | null = null;

  constructor(
    private _blogService: BlogService,
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.postId = params.get('postId')!;

      if (this.postId) {
        this._blogService.getBlogById(this.postId).subscribe((data) => {
          this.blogPost = data;
          this.comments = data.comments || [];
        });
      }
    });

    this._dataService.user$.subscribe({
      next: (user) => {
        this.currentUser = user;
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
        const { message, comments } = res;
        this.comments = comments;
        this.newCommentContent = '';
      });
  }

  deleteBlog() {
    this._blogService.deleteBlog(this.postId).subscribe((data) => {
      console.log('Blog deleted', data);
      this._router.navigate(['/']);
    });
  }

  approveComment(comment: Comment) {
    this._blogService.approveComment(comment._id!).subscribe({
      next: (data) => {
        this.blogPost.comments = this.blogPost.comments?.map((ele) =>
          ele._id === comment._id ? { ...ele, isApproved: true } : ele
        );
      },
    });
  }

  rejectComment(comment: Comment) {
    this._blogService.rejectComment(comment._id!, this.postId).subscribe({
      next: (data) => {
        console.log('Comment rejected', data);
      },
      error: (err) => {},
    });
  }
}
