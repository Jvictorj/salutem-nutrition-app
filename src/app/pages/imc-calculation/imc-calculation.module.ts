import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImcCalculationPageRoutingModule } from './imc-calculation-routing.module';

import { ImcCalculationPage } from './imc-calculation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImcCalculationPageRoutingModule
  ],
  declarations: [ImcCalculationPage]
})
export class ImcCalculationPageModule {}
