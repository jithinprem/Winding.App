import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmailStatus} from "./emailStatus.enum";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmEmail} from "../../../interfaces/confirmEmail";

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  public emailConfirmationStatus: EmailStatus = EmailStatus.NotConfirmed;
  public email: string = "";
  public modalRef?: BsModalRef;
  protected readonly EmailStatus = EmailStatus;

  @ViewChild('emailConfirmTemplate') emailConfirmationTemplate!: TemplateRef<any>;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  // TODO: if email is already confirmed appropriate message has to be displayed

  ngOnInit(): void {
    // if user logged in then direct to landing page
    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.router.navigateByUrl("/landing-page");
          return;
        }
      }
    });
    // verify email
    this.performEmailConfirmation();
  }

  public performEmailConfirmation(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if(params) {
        const confirmEmail: ConfirmEmail = {
          token: params.get('token'),
          email: params.get('email')
        }
        // call api
        this.accountService.verifyEmail(confirmEmail).subscribe({
          next: value => {
            this.emailConfirmationStatus = EmailStatus.Confirmed;
          },
          error: error => {
            this.emailConfirmationStatus = EmailStatus.Failed;
          }
        })

      }else {
        // broken route
        this.emailConfirmationStatus = EmailStatus.Failed;
      }
    })
  }

}
