import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImcCalculationPage } from './imc-calculation.page';

const routes: Routes = [
  {
    path: '',
    component: ImcCalculationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImcCalculationPageRoutingModule {}
