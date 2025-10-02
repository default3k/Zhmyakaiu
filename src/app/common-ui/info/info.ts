import { Component, Input } from '@angular/core';
import { Profile } from '../../data/services/profile';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {
  @Input() profile!: Profile;
}
