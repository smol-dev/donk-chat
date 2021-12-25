import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UiUser } from 'src/app/pages/services/models';
import { TwitchService } from 'src/app/pages/services/twitch.service';
import { ChatClient } from '@twurple/chat';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input() streamer?: UiUser;
  chatClient = new ChatClient();

  messages: string[] = [];

  constructor(private service: TwitchService) {
    this.service.chatClient?.onMessage((channel, user, message) => {
      this.messages.push(message);
    });
  }

  async loadChat() {
    console.log('loadChat');

    if (this.streamer?.name) {
      this.chatClient = new ChatClient({
        channels: [this.streamer?.name],
      });
    }
    await this.chatClient.connect();
    this.chatClient.onMessage((channel, user, message) => {
      console.log(message);

      this.messages = [message, ...this.messages];
    });
  }

  ngOnInit(): void {}
}
