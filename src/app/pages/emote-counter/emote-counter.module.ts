import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmoteCounterRoutingModule } from './emote-counter-routing.module';
import { EmoteCounterComponent } from './container/emote-counter.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [EmoteCounterComponent],
  imports: [
    CommonModule,
    EmoteCounterRoutingModule,
    NgxChartsModule,
  ],
})
export class EmoteCounterModule {}
