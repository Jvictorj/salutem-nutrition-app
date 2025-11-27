import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExercicioPageRoutingModule } from './exercicio-routing.module';
import { ExerciciosPage } from './exercicio.page'; // Aqui deve ser 'ExerciciosPage'
import { HttpClientModule } from '@angular/common/http';
=======
import { ExercicioPageRoutingModule } from './exercicio-routing.module'; 
import { ExerciciosPage } from './exercicio.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    IonicModule,HttpClientModule,
    ExercicioPageRoutingModule
  ],
  declarations: [ExerciciosPage] // Aqui também 'ExerciciosPage'
=======
    IonicModule,
    ExercicioPageRoutingModule 
  ],
  declarations: [ExerciciosPage]

})
export class ExercicioPageModule {}
