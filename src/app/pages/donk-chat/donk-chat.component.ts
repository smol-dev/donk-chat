import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-donk-chat',
  templateUrl: './donk-chat.component.html',
})
export class DonkChatComponent implements OnInit {
  constructor(public store: StoreService) {}

  ngOnInit() {}
}
