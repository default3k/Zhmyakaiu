import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html', 
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(Auth)

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(event: Event):void {

    if (this.form.valid) {
      console.log(this.form.value)
      //@ts-ignore
      this.authService.login(this.form.value)
    }
  } 
}
