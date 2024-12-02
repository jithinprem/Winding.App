import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BlogService} from "../blog.service";
import {BlogListResponse} from "../../../interfaces/blogListResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss']
})
export class MyBlogComponent implements OnInit{
  public blogs: BlogListResponse[] = [];
  public blogIdToDelete: number | null = null;
  public deleteModalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMyBlogs();
  }

  public getMyBlogs() {
    this.blogService.getMyBlogs().subscribe({
      next: result => {
        this.blogs = result;
      }
    })
  }

  public openBlog(blogId: number) {
    this.router.navigateByUrl('blog-read/' + blogId);
  }


  public openDeleteModal(template: TemplateRef<any>, blogId: number): void {
    this.blogIdToDelete = blogId;
    this.deleteModalRef = this.modalService.show(template); // Pass the TemplateRef here
  }

  deleteBlog(): void {
    if (this.blogIdToDelete !== null) {
      this.blogService.deleteBlog(this.blogIdToDelete).subscribe(() => {
        this.blogs = this.blogs.filter(blog => blog.blogId !== this.blogIdToDelete);
        this.deleteModalRef?.hide();
      });
    }
  }


}
