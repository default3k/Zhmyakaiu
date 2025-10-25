import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar";
import { ProfileService } from "../../data/services/profile";
import { IProfile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  profileService = inject(ProfileService)

  ngOnInit() {
    this.profileService.getMe().subscribe((val:IProfile) => {
      console.log(val)
    })
  }
}
