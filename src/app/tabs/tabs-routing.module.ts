import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'refeicao',
        loadChildren: () =>
          import('../pages/refeicao/refeicao.module').then(m => m.RefeicaoPageModule)
      },
      {
        path: 'nutriente-track',
        loadChildren: () =>
          import('../pages/nutriente-track/nutriente-track.module').then(m => m.NutrienteTrackPageModule)
      },
      {
        path: 'exercicio',
        loadChildren: () =>
          import('../pages/exercicios/exercicio.module').then(m => m.ExercicioPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'imc-calculation',
        loadChildren: () =>
          import('../pages/imc-calculation/imc-calculation.module').then(m => m.ImcCalculationPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
