import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SplashContentComponent } from './splash-content.component';



@NgModule({
  declarations: [SplashContentComponent],
  imports: [CommonModule, IonicModule],
  exports: [SplashContentComponent]
})
export class SplashContentModule { }
