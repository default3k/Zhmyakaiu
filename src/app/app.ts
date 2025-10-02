import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Main } from "./common-ui/main/main";
import { Info } from "./common-ui/info/info";
import { Profile } from './data/services/profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Main, Info],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('popa');
  profile = inject(Profile)
  profiles: Profile[] = [];

  constructor() {
    this.profile.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}
