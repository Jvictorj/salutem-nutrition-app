import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplashContentModule } from '../../../components/splash-content/splash-content.module';
import { IonicModule } from '@ionic/angular';

import { Splash1PageRoutingModule } from './splash-1-routing.module';

import { Splash1Page } from './splash-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashContentModule,
    Splash1PageRoutingModule
  ],
  declarations: [Splash1Page]
})
export class Splash1PageModule {}
