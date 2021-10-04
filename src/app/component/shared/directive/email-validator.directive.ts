import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../../../service/validator.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator{

  constructor(private validatorService : ValidatorService) { }

  //方法1
  // validate(control: AbstractControl) {
  //   let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   return EMAIL_REGEXP.test(control.value) ? null : {
  //     appEmailValidator: {
  //       valid: false
  //     }
  //   };
  // }

  //方法2 - call emailValidator func.
  validate(control: AbstractControl): ValidationErrors | null {
    return this.validatorService.emailValidator()(control);
  }

}