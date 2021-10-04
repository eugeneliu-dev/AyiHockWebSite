import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupPost } from 'src/app/model/signup-post';
import { AlertFormService } from 'src/app/service/alert-form.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { SignupUtilsService } from 'src/app/service/signup-utils.service';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup;
  signupInfo!: SignupPost;

  submitted = false;

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private signupService: SignupUtilsService,
              private alert: AlertFormService,
              private encryptDecryptService: EncryptDecryptService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.validatorService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    }, { validator: this.validatorService.passwordCrossValidator('password', 'confirm') });
  }




  get f() {
    return this.registerForm;
  }

  get fc() {
    return this.registerForm.controls;
  }

  get name() {
    return this.fc.name.value;
  }

  get email() {
    return this.fc.email.value;
  }

  get password() {
    return this.fc.password.value;
  }

  get confirm() {
    return this.fc.confirm.value;
  }

  get mobile() {
    return this.fc.mobile.value;
  }


  onSubmit() {

    var encryptPwd = this.encryptDecryptService.aesEncrypt(this.password);
    this.signupInfo = new SignupPost(this.name, this.email, encryptPwd, this.mobile);

    if (this.registerForm.valid) {
      this.signupService.signup(this.signupInfo).then(res => {
        if (!res.Success) {
          this.alert.opensweetalertdng('帳號註冊失敗', '請重新申請');
        } else {
          this.alert.opensweetalert('註冊成功，請至註冊信箱點擊驗證信中的連結，並重新登入!');
          this.router.navigate(['home']);
        }
      });
    } else {
      this.alert.opensweetalertdng('請確認註冊資料', '資料輸入不正確');
    }
  }

}

// export function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }
