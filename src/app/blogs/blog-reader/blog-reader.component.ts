import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../../../interfaces/blog";
import {BlogDto} from "../../../interfaces/blogDto";
import { NewLineToBrPipe } from './new-line-to-br.pipe';

@Component({
  selector: 'app-blog-reader',
  templateUrl: './blog-reader.component.html',
  styleUrls: ['./blog-reader.component.scss']
})
export class BlogReaderComponent implements OnInit{

  public blogId: string | null = null;
  public blogContent = "";
  public blogTitle: string | null = null;
  public tags: string[] = [];
  public publishDate: string | undefined= "";
  public author: string | undefined = "";
  public likeCount: number = 0;
  public isLiked: boolean = false;
  public showLikeIcon = false;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
        if(params && params.get('id')) {
          this.blogId = params.get('id');
          this.getBlobData(this.blogId);
        }
      })
    this.checkLiked();
  }

  public getBlobData(id: string | null) {
    if(!id){
      return;
    }
    this.blogService.getBlog(+id).subscribe({
      next: (value:BlogDto) => {
        this.blogContent = value.content;
        this.blogTitle = value.title;
        this.tags = value.tags;
        this.publishDate = value.publishDate;
        this.author = value.author;
      }
    })
  }

  public toggleLike() {
    if(this.blogId == null){
      return;
    }
    this.blogService.toggleLike(+this.blogId).subscribe(
      (res: any) => {
        this.isLiked = res;
      },
      (error) => {
        console.log("like failed!");
      }
    );
  }

  private checkLiked() {
    if(this.blogId == null){
      return;
    }
    this.blogService.checkLiked(+this.blogId).subscribe({
      next: (res: any) => {
        if(res == true) {
          this.isLiked = true;
          this.showLikeIcon = true;
        }else if(res == false) {
          this.showLikeIcon = true;
        }
      }
    })
  }


}
