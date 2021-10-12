import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AlertFormService } from 'src/app/service/alert-form.service';
import { UserUtilsService } from 'src/app/service/user-utils.service';
import { ValidatorService } from '../../service/validator.service';
import { Result } from 'src/app/model/result-format';
import { Observable } from 'rxjs';
import { UserPwdResetModel } from 'src/app/model/user-model';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.css']
})
export class PwdResetComponent implements OnInit {

  pwdResetForm!: FormGroup;
  userPwdResetModel!: UserPwdResetModel

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private alert: AlertFormService,
              private userUtilsService: UserUtilsService,
              private encryptDecryptService: EncryptDecryptService,
              private router: Router) { }

  ngOnInit(): void {
    this.pwdResetForm = this.fb.group({
      email: ['', [Validators.required, this.validatorService.emailValidator()]],
      authCode: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.validatorService.passwordCrossValidator('newPassword', 'confirm') });
  }

  get f() {
    return this.pwdResetForm;
  }

  get fc() {
    return this.pwdResetForm.controls;
  }

  get email() {
    return this.fc.email.value;
  }

  get authCode() {
    return this.fc.authCode.value;
  }

  get newPassword() {
    return this.fc.newPassword.value;
  }

  get confirm() {
    return this.fc.confirm.value;
  }

  onSubmit(){ 
    var encryptNewPwd = this.encryptDecryptService.aesEncrypt(this.newPassword);
    this.userPwdResetModel = new UserPwdResetModel(this.email, this.authCode, encryptNewPwd);

    this.userUtilsService.userResetPwd(this.userPwdResetModel).subscribe(
      (res) => {
        this.alert.opensweetalert('密碼重置成功，請重新登入!');
        this.router.navigate(['login']);
      },
      (error) => {
        this.alert.opensweetalertdng('密碼重置失敗', '請重新確認驗證碼及郵件帳號');
      },
    );
  }

}
