import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { RegisterService } from '../register.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {CrossFieldErrorMatcher} from '../CrossFieldErrorMatcher'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value !== '' ? {registererror: {value: control.value}} : null;
    };
  }

  passwordValidator(form: FormGroup){
    return form.get('password').value !== form.get('confirm').value ? {matcherror: true} : null
  }

  get username() {
    return this.formGroup.get('username')
  }

  get password() {
    return this.formGroup.get('password')
  }

  get hidden() {
    return this.formGroup.get('hidden')
  }

  get confirm() {
    return this.formGroup.get('confirm')
  }

  crossFieldErrorMatcher = new CrossFieldErrorMatcher('matcherror')

  constructor(private registerService : RegisterService, private router:Router) { }
  
  formGroup = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    confirm : new FormControl('', Validators.required),
    hidden : new FormControl('', this.registerValidator())
  },{
    validators : this.passwordValidator
  });

  usernameSubscription : Subscription
  passwordSubscription : Subscription
  confirmSubscription : Subscription

  ngOnInit(): void {
    this.usernameSubscription = this.username.valueChanges.subscribe(x => this.hidden.setValue(''))
    this.passwordSubscription = this.password.valueChanges.subscribe(x => this.hidden.setValue(''))
    this.confirmSubscription = this.confirm.valueChanges.subscribe(x => this.hidden.setValue(''))
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe()
    this.passwordSubscription.unsubscribe()
    this.confirmSubscription.unsubscribe()
  }

  onSubmit(): void {

    const onError: Function = (err) => {
      this.hidden.setValue('registererror')
      console.warn("error treated")
    }

    const onSuccess: Function = (next) => {
      this.router.navigate(['/login'])
    }

    this.registerService.registerUser(this.formGroup.value, onSuccess, onError)
  }

  getErrorMessagePassword(): string{
    return this.password.hasError('required') ? "This field is required" : ''
  }

  getErrorMessageConfirm(): string{
    return this.confirm.hasError('required') ? "This field is required" : ''
  }

}
