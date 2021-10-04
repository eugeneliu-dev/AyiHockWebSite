import { UserPwdModifyModel } from './../../model/user-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AlertFormService } from 'src/app/service/alert-form.service';
import { ValidatorService } from '../../service/validator.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { UserUtilsService } from 'src/app/service/user-utils.service';
import { AuthenticationService } from './../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pwd-modify',
  templateUrl: './pwd-modify.component.html',
  styleUrls: ['./pwd-modify.component.css']
})
export class PwdModifyComponent implements OnInit {

  pwdModifyForm!: FormGroup;
  userPwdModifyModel!: UserPwdModifyModel

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private alert: AlertFormService,
              private encryptDecryptService: EncryptDecryptService,
              private userUtilsService: UserUtilsService,
              private auth: AuthenticationService,
              private router: Router,) { }

  ngOnInit(): void {
    this.pwdModifyForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.validatorService.passwordCrossValidator('newPassword', 'confirm') });
  }

  get f() {
    return this.pwdModifyForm;
  }

  get fc() {
    return this.pwdModifyForm.controls;
  }

  get oldPassword() {
    return this.fc.oldPassword.value;
  }

  get newPassword() {
    return this.fc.newPassword.value;
  }

  get confirm() {
    return this.fc.confirm.value;
  }

  onSubmit(){ 
    var encryptOldPwd = this.encryptDecryptService.aesEncrypt(this.oldPassword);
    var encryptNewPwd = this.encryptDecryptService.aesEncrypt(this.newPassword);

    this.userPwdModifyModel = new UserPwdModifyModel(encryptOldPwd, encryptNewPwd);
    if (this.pwdModifyForm.valid) {
      this.userUtilsService.userModifyPwd(this.userPwdModifyModel).then(res => {
        if (!res.Success){
          this.alert.opensweetalertdng('密碼修改失敗', '請重新操作')
        }else{
          this.auth.logout();
          this.router.navigate(['login']);
          this.alert.opensweetalert('密碼修改成功，請重新登入!');
        }
      });
    }else {
      this.alert.opensweetalertdng('請確認新舊密碼資料', '資料輸入不正確');
    }


  }

}
