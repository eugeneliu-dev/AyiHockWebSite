import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Result } from 'src/app/model/result-format';
import { UserPwdForgetModel } from 'src/app/model/user-model';
import { AlertFormService } from 'src/app/service/alert-form.service';
import { EncryptDecryptService } from 'src/app/service/encrypt-decrypt.service';
import { UserUtilsService } from 'src/app/service/user-utils.service';
import { ValidatorService } from 'src/app/service/validator.service';

@Component({
  selector: 'app-pwd-forget',
  templateUrl: './pwd-forget.component.html',
  styleUrls: ['./pwd-forget.component.css']
})
export class PwdForgetComponent implements OnInit {

  pwdForgetForm!: FormGroup;
  userPwdForgetModel!: UserPwdForgetModel

  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    private alert: AlertFormService,
    private userUtilsService: UserUtilsService) { }

    ngOnInit(): void {
      this.pwdForgetForm = this.fb.group({
        email: ['', [Validators.required, this.validatorService.emailValidator()]]
      });
    }

    get f() {
      return this.pwdForgetForm;
    }
  
    get fc() {
      return this.pwdForgetForm.controls;
    }
  
    get email() {
      return this.fc.email.value;
    }

    onSubmit(){ 
      this.userPwdForgetModel = new UserPwdForgetModel(this.email);
  
      this.userUtilsService.userForgetPwd(this.userPwdForgetModel).subscribe(
        (res) => {
          this.alert.opensweetalert('重置驗證信已發送至指定的信箱，請依指示操作！');
        },
        (error) => {
          this.alert.opensweetalertdng('查無此郵件帳號', '請重新輸入郵件帳號！');
          this.f.reset();
        },
      );
    }

}
