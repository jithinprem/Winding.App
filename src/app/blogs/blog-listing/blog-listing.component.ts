import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../interfaces/blog";
import {BlogService} from "../blog.service";
import {Router} from "@angular/router";
import {BlogListResponse} from "../../../interfaces/blogListResponse";

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss']
})
export class BlogListingComponent implements OnInit{
  public blogs: BlogListResponse[] = [];
  public page: number = 1;

  constructor(
    private blogService: BlogService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  public fetchBlogs() {
    this.blogService.fetchBlogs(this.page).subscribe({
      next: (value: Array<BlogListResponse>) => {
        this.blogs = value;
      }
    })
  }

  public openBlog(blogId: number) {
    this.router.navigateByUrl('blog-read/' + blogId);
  }

  // Save to collection
  saveToCollection(blogId: number) {
    console.log(`Blog ${blogId} saved to collection.`);
    alert(`Blog ${blogId} saved!`);
  }

  // Filter by tag
  filterByTag(tag: string) {
    console.log(`Filtering blogs by tag: ${tag}`);
    alert(`Filtering by tag: ${tag}`);
  }
}
