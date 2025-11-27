import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { Routes, RouterModule } from '@angular/router';

import { ExerciciosPage } from './exercicio.page';
=======
import { RouterModule, Routes } from '@angular/router';
import { ExerciciosPage } from './exercicio.page'; // Confirme se o nome está correto
>>>>>>> final-V2

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: ExerciciosPage
=======
    component: ExerciciosPage // Verifique se o nome está correto
>>>>>>> final-V2
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
<<<<<<< HEAD
  exports: [RouterModule],
})
export class ExercicioPageRoutingModule {}
=======
  exports: [RouterModule]
})
export class ExercicioPageRoutingModule {} // O nome da classe deve corresponder
>>>>>>> final-V2
