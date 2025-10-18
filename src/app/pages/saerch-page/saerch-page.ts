import { Component, inject, signal } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile';
import { Main } from "../../common-ui/main/main";
import { Info } from "../../common-ui/info/info";

@Component({
  selector: 'app-saerch-page',
  imports: [Main, Info],
  templateUrl: './saerch-page.html',
  styleUrl: './saerch-page.scss'
})
export class SaerchPage {
  protected readonly title = signal('popa');
  profile = inject(ProfileService)
  profiles: IProfile[] = [];

  constructor() {
    this.profile.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }
}
