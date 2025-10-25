import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { delay, from, map, skip, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html', 
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(Auth)
  router = inject(Router)

  form = new FormGroup({
    username: new FormControl<string|null>(null, Validators.required),
    password: new FormControl<string|null>(null, Validators.required),
  })

  isPasswordVisible = signal<boolean>(false)


 // изучение штук rxjs
  // constructor(){
  //   from([1,2,3,4,5,6,7,8,9,10])
  //   .pipe(
  //     map(val=> val *2),
  //    take(2)
  //     skip(2),
  //     delay(1000),

  //     tap(val => {
  //       this.form.patchValue({username: val.toString()})
  //     })

  //   )
  //   .subscribe(val =>{
  //       console.log(val)
  //     })
  // }

  onSubmit(event: Event):void {
  if (this.form.valid) {
    //@ts-ignore
    this.authService.login(this.form.value)
      .subscribe(res => {
        this.router.navigate([''])
        console.log(res);
      })
    }
  }
}
