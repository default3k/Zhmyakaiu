import { Component, Input } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {
  @Input() profile!: IProfile;
}
