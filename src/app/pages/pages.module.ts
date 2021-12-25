import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
  NbActionsModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbTableModule,
} from '@nebular/theme';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    NbLayoutModule,
    NbActionsModule,
    CommonModule,
    PagesRoutingModule,
    NbSearchModule,
  ],
})
export class PagesModule {}
