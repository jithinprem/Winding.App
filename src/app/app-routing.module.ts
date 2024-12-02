import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {BlogPageComponent} from "./blogs/blog-page/blog-page.component";
import {BlogReaderComponent} from "./blogs/blog-reader/blog-reader.component";
import {authguardGuard} from "./guards/authguard.guard";
import {MyBlogComponent} from "./blogs/my-blog/my-blog.component";
import {BlogListingComponent} from "./blogs/blog-listing/blog-listing.component";
import {EmailConfirmationComponent} from "./sign/email-confirmation/email-confirmation.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: () => import('./sign/sign.module').then(m => m.SignModule) },
  {
    path: 'landing-page',
    canActivate: [authguardGuard],
    runGuardsAndResolvers: "always",
    children: [
      {path: "", component: LandingPageComponent},
      {path: 'myblogs', component: MyBlogComponent},
    ]
  },
  { path: 'blog-page',
    component: BlogPageComponent,
    canActivate: [authguardGuard],
    runGuardsAndResolvers: "always",
  },
  { path: 'blog-read/:id', component: BlogReaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
