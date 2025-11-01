import { Component, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgFor } from '@angular/common';
import { SubscriberCard } from "../../common-ui/sidebar/subscriber-card/subscriber-card";
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe"; // Добавь NgFor
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, NgFor, SubscriberCard, RouterModule, ImgUrlPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  
  me$ = toObservable(this.profileService.me)
  
  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') { return this.me$ }
      return this.profileService.getAccount(id)
    })
  )

  subscribers$ = this.profileService.getTestAccounts().pipe(
    tap(accounts => {
      console.log('Все подписчики:', accounts);
    })
  )
}