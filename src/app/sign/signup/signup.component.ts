import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../sign.styles.scss']
})
export class SignupComponent implements OnInit{

  @ViewChild('emailConfirm', { static: true }) emailConfirm!: TemplateRef<void>;

  public registerForm: FormGroup = new FormGroup({});
  public submitted: boolean = false;
  public registrationSuccess: boolean = false;
  public errorMessages: string[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => {
        // inform verify email
        this.registrationSuccess = true;
      },
      error: err => {
        this.errorMessages.push(err.message);
      }
    });
  }



  private initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    })
  }

}
