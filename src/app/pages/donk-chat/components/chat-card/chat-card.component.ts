import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UiEmote, UiUser } from 'src/app/models/models';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input() streamer: UiUser | null = null;
  @Input() emotes?: Map<string, UiEmote> | null;
  @Input() messages: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  getEmotes(message: string): UiEmote[] {
    return ' '
      .concat(message)
      .split(' ')
      .filter((word) => this.emotes?.has(word))
      .map((word) => this.emotes?.get(word)!);
  }
}
