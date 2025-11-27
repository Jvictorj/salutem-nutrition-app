import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Splash3Page } from './splash-3.page';

const routes: Routes = [
  {
    path: '',
    component: Splash3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Splash3PageRoutingModule {}
