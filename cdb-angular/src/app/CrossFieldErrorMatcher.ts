
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CrossFieldErrorMatcher implements ErrorStateMatcher{

  constructor(private error:string){}

  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return control.dirty && form.hasError(this.error);
  }
}