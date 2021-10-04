import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AlertFormService } from 'src/app/service/alert-form.service';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.css']
})
export class PwdResetComponent implements OnInit {

  pwdResetForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private alert: AlertFormService) { }

  ngOnInit(): void {
    this.pwdResetForm = this.fb.group({
      email: ['', [Validators.required, this.validatorService.emailValidator()]]
    });
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

  onSubmit(){ 
    

   }

}
