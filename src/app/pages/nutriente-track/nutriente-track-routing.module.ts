import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutrienteTrackPage } from './nutriente-track.page';

const routes: Routes = [
  {
    path: '',
    component: NutrienteTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutrienteTrackPageRoutingModule {}
