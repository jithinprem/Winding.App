import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AccountService} from "./sign/account.service";
import {Router} from "@angular/router";
import {startWith} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Winding.App';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.refreshUser();
  }


  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if(jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next(_:any) {
        },
        error: (error: any) => {
          this.accountService.logout();
          if (error.status === 401) {
            this.router.navigateByUrl("/");
          }
        }
      })
    } else {
      this.accountService.refreshUser(null).subscribe();
    }
  }

}
