import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  emailValidator(): ValidatorFn
  {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mailRegExp = new RegExp(regularExpression, 'i')
    return (control: AbstractControl): ValidationErrors | null => {
        const mailcheck = mailRegExp.test(control.value);
        return mailcheck ? null : {appEmailValidator: {valid: false}};
    };
  }

  passwordCrossValidator(controlName: string, matchingControlName: string)
  {
    // return (control: AbstractControl): ValidationErrors | null => {
    //   const pwd = control.get('password');
    //   const confirm = control.get('confirm');
    //   return pwd && confirm && pwd === confirm ? {'pwdConfirmValidator': true} : null;

    // };

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }


}

