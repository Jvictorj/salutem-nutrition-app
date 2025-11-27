import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplashContentModule } from '../../../components/splash-content/splash-content.module';
import { IonicModule } from '@ionic/angular';

import { Splash2PageRoutingModule } from './splash-2-routing.module';

import { Splash2Page } from './splash-2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashContentModule,
    Splash2PageRoutingModule
  ],
  declarations: [Splash2Page]
})
export class Splash2PageModule {}
