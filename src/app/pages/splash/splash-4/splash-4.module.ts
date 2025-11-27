import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplashContentModule } from '../../../components/splash-content/splash-content.module';
import { IonicModule } from '@ionic/angular';

import { Splash4PageRoutingModule } from './splash-4-routing.module';

import { Splash4Page } from './splash-4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashContentModule,
    Splash4PageRoutingModule
  ],
  declarations: [Splash4Page]
})
export class Splash4PageModule {}
