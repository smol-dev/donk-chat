import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NbLayoutModule } from '@nebular/theme';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    NbLayoutModule,
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
