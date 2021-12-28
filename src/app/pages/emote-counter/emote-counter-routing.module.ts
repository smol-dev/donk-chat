import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmoteCounterComponent } from './container/emote-counter.component';

const routes: Routes = [{ path: '', component: EmoteCounterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmoteCounterRoutingModule { }
