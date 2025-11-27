import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExercicioPageRoutingModule } from './exercicio-routing.module';
import { ExerciciosPage } from './exercicio.page';

// CORREÇÃO: Importar o componente do Card
import { ExercicioComponent } from '../../components/exercicio/exercicio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercicioPageRoutingModule
  ],
  declarations: [
    ExerciciosPage,
    ExercicioComponent  
  ]
})
export class ExercicioPageModule {}