import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPersonalDataPage } from './edit-personal-data.page';

const routes: Routes = [
  {
    path: '',
    component: EditPersonalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPersonalDataPageRoutingModule {}
