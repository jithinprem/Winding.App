import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../sign/account.service";
import {User} from "../../interfaces/user";
import {map} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{


  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {

  }

  public goToWrite() {
    this.router.navigateByUrl("/blog-page");
  }

  public signOut() {
    this.accountService.logout();
  }

}
