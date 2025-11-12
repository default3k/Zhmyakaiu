import { Component, inject, signal } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map, BehaviorSubject } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";
import { RouterModule } from '@angular/router';
import { IProfile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, ImgUrlPipe, RouterModule],
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

  // Единый источник данных для подписчиков
  private allSubscribers$ = this.profileService.getTestAccounts().pipe(
    tap(accounts => {
      console.log('Все подписчики:', accounts);
    })
  );

  // Отображаемые подписчики (можно ограничить количество)
  displayedSubscribers$ = this.allSubscribers$.pipe(
    map(accounts => accounts.slice(0, 6)) // Показываем первых 6 подписчиков
  );

  // Количество отображаемых подписчиков
  displayedSubscribersCount = 6;

  getAboutText(profile: IProfile): string {
    const parts = [];
    
    if (profile.stack && profile.stack.length > 0) {
      parts.push(`Разработчик с навыками в ${profile.stack.join(', ')}`);
    }
    
    if (profile.city) {
      parts.push(`проживающий в ${profile.city}`);
    }
    
    if (parts.length === 0) {
      return 'Пользователь пока не добавил информацию о себе';
    }
    
    return parts.join('. ') + '.';
  }

  // Метод для добавления подписчика
  addSubscriber() {
    // Здесь будет логика добавления нового подписчика
    console.log('Добавление нового подписчика');
    // Можно открыть модальное окно или сделать что-то еще
  }
}