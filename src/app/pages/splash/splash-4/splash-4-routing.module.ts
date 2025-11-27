import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Splash4Page } from './splash-4.page';

const routes: Routes = [
  {
    path: '',
    component: Splash4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Splash4PageRoutingModule {}
