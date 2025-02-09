import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  // Get all blog posts
  getAllBlogs(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(environment.apiUrl + 'posts');
  }

  // Get single blog post by ID
  //   getBlogById(id: string): Observable<BlogPost> {
  //     return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  //   }

  //   // Create a new blog post
  //   createBlog(blog: BlogPost): Observable<BlogPost> {
  //     return this.http.post<BlogPost>(this.apiUrl, blog);
  //   }

  //   // Update a blog post
  //   updateBlog(id: string, blog: BlogPost): Observable<BlogPost> {
  //     return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, blog);
  //   }

  //   // Delete a blog post
  //   deleteBlog(id: string): Observable<any> {
  //     return this.http.delete(`${this.apiUrl}/${id}`);
  //   }
}
