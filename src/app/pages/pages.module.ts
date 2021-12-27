import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import {
  NbActionsModule,
  NbLayoutModule,
  NbSearchModule,
} from '@nebular/theme';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NbActionsModule,
    NbLayoutModule,
    NbSearchModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
