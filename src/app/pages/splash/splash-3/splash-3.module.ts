import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplashContentModule } from '../../../components/splash-content/splash-content.module';
import { IonicModule } from '@ionic/angular';

import { Splash3PageRoutingModule } from './splash-3-routing.module';

import { Splash3Page } from './splash-3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashContentModule,
    Splash3PageRoutingModule
  ],
  declarations: [Splash3Page]
})
export class Splash3PageModule {}
