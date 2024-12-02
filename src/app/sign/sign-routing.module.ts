import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {EmailConfirmationComponent} from "./email-confirmation/email-confirmation.component";
import {MyBlogComponent} from "../blogs/my-blog/my-blog.component";
import {BlogListingComponent} from "../blogs/blog-listing/blog-listing.component";
import {DemoComponent} from "./demo/demo.component";

const routes: Routes = [
  {path: '', component: DemoComponent},
  { path: 'verify-token', component: EmailConfirmationComponent},
  { path: 'demo', component: DemoComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SignRoutingModule { }
