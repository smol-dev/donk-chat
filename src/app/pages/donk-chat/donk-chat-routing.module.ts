import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonkChatComponent } from './container/donk-chat.component';

const routes: Routes = [{ path: '', component: DonkChatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonkChatRoutingModule { }
