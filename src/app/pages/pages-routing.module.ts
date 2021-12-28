import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'emote-counter',
        loadChildren: () =>
          import('./emote-counter/emote-counter.module').then(
            (m) => m.EmoteCounterModule
          ),
      },

      {
        path: 'donk-chat',
        loadChildren: () =>
          import('./donk-chat/donk-chat.module').then((m) => m.DonkChatModule),
      },
      {
        path: '',
        redirectTo: 'donk-chat',
        pathMatch: 'full',
      },
      // {
      //   path: '**',
      //   component: NotFoundComponent,
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
