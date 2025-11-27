import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Splash1Page } from './splash-1.page';

const routes: Routes = [
  {
    path: '',
    component: Splash1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Splash1PageRoutingModule {}