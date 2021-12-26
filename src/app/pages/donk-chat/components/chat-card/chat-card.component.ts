import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UiEmote, UiUser } from 'src/app/pages/models/models';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input() streamer?: UiUser;
  @Input() emotes?: Map<string, UiEmote>;
  @Input() messages: string[] = [];

  constructor() {}

  loadChat() {
    throw 'TOdo';
  }

  ngOnInit(): void {
    console.log('emotes', this.emotes);
  }

  getEmotes() {}
}
