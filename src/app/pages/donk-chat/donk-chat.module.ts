import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChatCardComponent } from './components/chat-card/chat-card.component';
import { DonkChatComponent } from './container/donk-chat.component';
import { DonkChatRoutingModule } from './donk-chat-routing.module';
import { EmoteComponent } from './components/emote/emote.component';
import { UserCardComponent } from './components/user-card/user-card.component';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbListModule,
} from '@nebular/theme';

@NgModule({
  declarations: [
    ChatCardComponent,
    DonkChatComponent,
    EmoteComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    DonkChatRoutingModule,
    FlexLayoutModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbInputModule,
    NbListModule,
    ReactiveFormsModule,
  ],
})
export class DonkChatModule {}
