import { Component } from '@angular/core';
import {BlogService} from "../blog.service";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {
  blogTitle: string = '';
  blogContent: string = '';
  tags: string[] = [];
  wordCount: number = 0;

  constructor(private blogService: BlogService) {
  }

  public addTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      input.value = '';
    }
    event.preventDefault();
  }

  public removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  public updateWordCount(): void {
    this.wordCount = this.blogContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }


  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`;
    this.updateWordCount();
  }

  private getDescription(str: string): string {
    const descLen = str.length < 150 ? str.length : 150;
    return str.substring(0, descLen);
  }


  public publishBlog(): void {
    if (!this.blogTitle || !this.blogContent || this.tags.length === 0) {
      alert('Title, content, and at least one tag are required.');
      return;
    }

    const blogDto = {
      title: this.blogTitle,
      description: this.getDescription(this.blogContent),
      content: this.blogContent,
      tags: this.tags
    };
    this.blogService.addBlog(blogDto).subscribe(
      (response: any) => {
        alert('Blog created successfully!');
      },
      (error) => {
        console.error('Error publishing blog:', error);
        alert('Failed to publish blog.');
      }
    );


  }
}
