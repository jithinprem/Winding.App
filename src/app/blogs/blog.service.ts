import { Injectable } from '@angular/core';
import {BlogDto} from "../../interfaces/blogDto";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../../interfaces/blog";
import {BlogListResponse} from "../../interfaces/blogListResponse";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  public addBlog(blogDto: BlogDto){
    return this.http.post(`${environment.appUrl}blog/add-blog`,blogDto);
  }

  public fetchBlogs(page: number): Observable<Array<BlogListResponse>> {
    return this.http.get<Array<BlogListResponse>>(`${environment.appUrl}blog/fetch-blogs/${page}`);
  }

  public getBlog(id: number): Observable<BlogDto>{
    return this.http.get<BlogDto>(`${environment.appUrl}blog/get-blog-content/${id}`);
  }

  public deleteBlog(id: number) {
    return this.http.delete(`${environment.appUrl}blog/delete/${id}`);
  }

  public getMyBlogs() {
    return this.http.get<Array<BlogListResponse>>(`${environment.appUrl}blog/get-my-blogs`);
  }

  public toggleLike(blogId: number) {
    return this.http.post(`${environment.appUrl}blog/toggle-like/${blogId}`, {})
  }

  public checkLiked(blogId: number) {
    return this.http.get(`${environment.appUrl}blog/check-like/${blogId}`);
  }

}
