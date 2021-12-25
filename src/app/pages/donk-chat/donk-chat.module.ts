import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DonkChatRoutingModule } from './donk-chat-routing.module';
import { DonkChatComponent } from './donk-chat.component';

import {
  NbAutocompleteModule,
  NbCardModule,
  NbFormFieldModule,
  NbSelectModule,
} from '@nebular/theme';

@NgModule({
  declarations: [DonkChatComponent],
  imports: [
    CommonModule,
    DonkChatRoutingModule,
    NbCardModule,
    NbFormFieldModule,
    NbSelectModule,
    NbAutocompleteModule,
  ],
})
export class DonkChatModule {}
