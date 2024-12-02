import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {SigninComponent} from "../sign/signin/signin.component";
import {SignupComponent} from "../sign/signup/signup.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public bsModalRef?: BsModalRef;
  public modalRef?: BsModalRef;
  private config = {
    backdrop: true,
    ignoreBackdropClick: false,
  }

  constructor(
    private modalService: BsModalService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {

  }

  public openSignIn(){
    const initialState: ModalOptions = {
      animated: true
    };
    this.bsModalRef = this.modalService.show(SigninComponent, initialState);
  }

  public showConfirmEmailModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  public openSignUp(){
    const initialState: ModalOptions = {
      animated: true
    };
    this.bsModalRef = this.modalService.show(SignupComponent, initialState);
  }

  public verifyEmail() {

  }
}
