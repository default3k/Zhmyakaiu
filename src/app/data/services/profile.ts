import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  avatarUrl: any;
  lastName: any;
  firstName: any;

   me = signal<IProfile | null>(null)

getSubscribersShortList(){
  return this.http.get<Pageble<IProfile>>(`${this.baseApiUrl}account/subscribers`, {
    params: {
      page: 1,
      size: 3
    }
  })
   .pipe(
      tap(res => console.log('Raw response:', res)),
      map(res => res.items)
   )
}

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }
}