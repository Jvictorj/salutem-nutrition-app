import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD
import { ExercicioPageRoutingModule } from './exercicio-routing.module';
import { ExerciciosPage } from './exercicio.page'; // Aqui deve ser 'ExerciciosPage'
import { HttpClientModule } from '@angular/common/http';
=======
import { ExercicioPageRoutingModule } from './exercicio-routing.module'; 
import { ExerciciosPage } from './exercicio.page';
>>>>>>> final-V2

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
<<<<<<< HEAD
    IonicModule,HttpClientModule,
    ExercicioPageRoutingModule
  ],
  declarations: [ExerciciosPage] // Aqui também 'ExerciciosPage'
=======
    IonicModule,
    ExercicioPageRoutingModule 
  ],
  declarations: [ExerciciosPage]
>>>>>>> final-V2
})
export class ExercicioPageModule {}
