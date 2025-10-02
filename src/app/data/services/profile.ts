import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class Profile {
  http = inject(HttpClient)
  baseApiUrl:string = 'https://icherniakov.ru/yt-course/'
id: any;
username: any;

  getTestAccounts(){
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
