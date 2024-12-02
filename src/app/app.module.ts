import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SignModule} from "./sign/sign.module";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import { NavbarComponent } from './navbar/navbar.component';
import { BlogListingComponent } from './blogs/blog-listing/blog-listing.component';
import { BlogPageComponent } from './blogs/blog-page/blog-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptorInterceptor} from "./shared/services/jwt-interceptor.interceptor";
import { NgxSpinnerModule} from "ngx-spinner";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { BlogReaderComponent } from './blogs/blog-reader/blog-reader.component';
import { NewLineToBrPipe } from './blogs/blog-reader/new-line-to-br.pipe';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { MyBlogComponent } from './blogs/my-blog/my-blog.component';
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LandingPageComponent,
    NavbarComponent,
    BlogListingComponent,
    BlogPageComponent,
    BlogReaderComponent,
    NewLineToBrPipe,
    MyBlogComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SignModule,
    NgxSpinnerModule,
    MatIconModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
