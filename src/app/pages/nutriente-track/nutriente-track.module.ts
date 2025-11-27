import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutrienteTrackPageRoutingModule } from './nutriente-track-routing.module';

import { NutrienteTrackPage } from './nutriente-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutrienteTrackPageRoutingModule
  ],
  declarations: [NutrienteTrackPage]
})
export class NutrienteTrackPageModule {}
