import { Component, Input, OnInit } from '@angular/core';
import { UiUser } from 'src/app/models/models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() streamer?: UiUser;

  constructor() {}

  ngOnInit(): void {}
}
