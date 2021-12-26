import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DonkChatRoutingModule } from './donk-chat-routing.module';
import { DonkChatComponent } from './donk-chat.component';

import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbSearchModule,
  NbSelectModule,
} from '@nebular/theme';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatCardComponent } from './components/chat-card/chat-card.component';
import { EmoteComponent } from './components/emote/emote.component';

@NgModule({
  declarations: [
    DonkChatComponent,
    UserCardComponent,
    ChatCardComponent,
    EmoteComponent,
  ],
  imports: [
    CommonModule,
    DonkChatRoutingModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    FlexLayoutModule,
    NbSearchModule,
    NbInputModule,
    NbAutocompleteModule,
    NbAutocompleteModule,
  ],
})
export class DonkChatModule {}
