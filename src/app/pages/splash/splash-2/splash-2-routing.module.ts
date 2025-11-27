import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Splash2Page } from './splash-2.page';

const routes: Routes = [
  {
    path: '',
    component: Splash2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Splash2PageRoutingModule {}
