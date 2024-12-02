import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {ModalCommonService} from "../../shared/services/modal.common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {take} from "rxjs";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../sign.styles.scss']
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public submitted: boolean = false;
  public errorList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private modalCommonService: ModalCommonService,
    private spinnerService: NgxSpinnerService,
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  public passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  public async onSubmit(){
    this.submitted = true;
    this.errorList =[];
    if (this.loginForm.invalid)
      return;
    // call api
    // on success assign the user with the value
    this.spinnerService.show();

    this.accountService.user$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.router.navigateByUrl("landing-page");
          this.modalCommonService.closeAllModals();
        }
      }
    });

    this.accountService.login(this.loginForm.value).subscribe({
      next: res => {
        this.bsModalRef.hide();
        this.router.navigateByUrl("landing-page");
        this.spinnerService.hide();
      },
      error: error => {
        console.log(error);
        this.spinnerService.hide();
        this.errorList.push(error.error);
      }
    })


  }

  private initializeForm() {
    this.errorList = [];
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



}
