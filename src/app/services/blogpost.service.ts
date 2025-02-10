import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, Comment } from '../models/blogpost.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return headers;
  }

  constructor(private http: HttpClient) {}

  // Get all blog posts
  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(environment.apiUrl + 'posts');
  }

  // Get single blog post by ID
  getBlogById(postId: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiUrl}posts/${postId}`);
  }

  // Create a new blog post
  createBlog(blog: BlogPost): Observable<BlogPost> {
    const headers = this.getAuthHeader();
    return this.http.post<BlogPost>(environment.apiUrl + 'posts', blog, {
      headers,
    });
  }

  //   // Update a blog post
  //   updateBlog(id: string, blog: BlogPost): Observable<BlogPost> {
  //     return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, blog);
  //   }

  //   // Delete a blog post
  //   deleteBlog(id: string): Observable<any> {
  //     return this.http.delete(`${this.apiUrl}/${id}`);
  //   }

  // Get all Comments
  addCommentOnPost(postId: string, comments: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.apiUrl}posts/${postId}/addcomment`,
      comments
    );
  }

  // Get all Caterogies
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + 'categories');
  }
}
