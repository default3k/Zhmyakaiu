import { Component, inject } from '@angular/core';
import { Main } from '../main/main';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubscriberCard } from "./subscriber-card/subscriber-card";
import { ProfileService } from '../../data/services/profile';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [Main, CommonModule, RouterModule, SubscriberCard],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getTestAccounts().pipe(
  map(accounts => accounts.slice(0, 3))
);
  
  
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ];
}