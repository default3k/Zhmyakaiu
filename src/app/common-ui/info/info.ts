import { Component, Input } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url-pipe";

@Component({
  selector: 'app-info',
  imports: [ImgUrlPipe],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {
  @Input() profile!: IProfile;  
}
