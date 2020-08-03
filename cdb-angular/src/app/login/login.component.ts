import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'
import { Observable, Subscription } from 'rxjs';
import { Authentication } from '../models/authentication.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value !== '' ? {loginerror: {value: control.value}} : null;
    };
  }

  // onChange: Function = () => {
  //   this.hidden.setValue('');
  //   this.formGroup.updateValueAndValidity();
  // }

  get username() {
    return this.formGroup.get('username')
  }

  get password() {
    return this.formGroup.get('password')
  }

  get hidden() {
    return this.formGroup.get('hidden')
  }

  usernameSubscription : Subscription
  passwordSubscription : Subscription

  constructor(private service:AuthenticationService, private router:Router) { }

  formGroup : FormGroup = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    hidden : new FormControl('', this.loginValidator())
  })

  ngOnInit(): void {
    this.usernameSubscription = this.username.valueChanges.subscribe(x => this.hidden.setValue(''))
    this.passwordSubscription = this.password.valueChanges.subscribe(x => this.hidden.setValue(''))
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe()
    this.passwordSubscription.unsubscribe()
  }

  onSubmit(){
    const onError: Function = (err) => {
      this.hidden.setValue('loginerror')
    }

    const onSuccess: Function = (next) => {
      this.router.navigate(['/dashboard'])
    }

    this.service.login(this.formGroup.value, onSuccess, onError);
  }

  getErrorMessageUsername(): string{
    return this.username.hasError('required') ? "This field is required" : ''
  }

  getErrorMessagePassword(): string{
    return this.password.hasError('required') ? "This field is required" : ''
  }

}
