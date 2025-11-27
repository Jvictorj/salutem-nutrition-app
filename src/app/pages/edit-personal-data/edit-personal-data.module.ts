import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPersonalDataPageRoutingModule } from './edit-personal-data-routing.module';

import { EditPersonalDataPage } from './edit-personal-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPersonalDataPageRoutingModule
  ],
  declarations: [EditPersonalDataPage]
})
export class EditPersonalDataPageModule {}
