import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmoteCounterRoutingModule } from './emote-counter-routing.module';
import { EmoteCounterComponent } from './container/emote-counter.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [EmoteCounterComponent],
  imports: [
    CommonModule,
    EmoteCounterRoutingModule,
    NgxEchartsModule.forChild(),
  ],
})
export class EmoteCounterModule {}
