import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: 'feature',
      //   loadChildren: () =>
      //     import('./feature/feature.module').then((m) => m.FeatrueModule),
      // },
      // {
      //   path: '',
      //   redirectTo: 'feature',
      //   pathMatch: 'full',
      // },
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
