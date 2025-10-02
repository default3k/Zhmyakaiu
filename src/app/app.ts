import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Main } from "./common-ui/main/main";
import { Info } from "./common-ui/info/info";
import { Profile } from './data/services/profile';
import { IProfile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Main, Info],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('popa');
  profile = inject(Profile)
  profiles: IProfile[] = [];

  constructor() {
    this.profile.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}
