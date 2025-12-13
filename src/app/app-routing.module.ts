import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 🔹 Rota inicial (Redireciona para 'welcome' ao abrir o app)
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  // 🔹 Telas públicas (SEM TAB BAR)
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'splash-1',
    loadChildren: () =>
      import('./pages/splash/splash-1/splash-1.module').then(m => m.Splash1PageModule)
  },
  {
    path: 'splash-2',
    loadChildren: () =>
      import('./pages/splash/splash-2/splash-2.module').then(m => m.Splash2PageModule)
  },
  {
    path: 'splash-3',
    loadChildren: () =>
      import('./pages/splash/splash-3/splash-3.module').then(m => m.Splash3PageModule)
  },
  {
    path: 'splash-4',
    loadChildren: () =>
      import('./pages/splash/splash-4/splash-4.module').then(m => m.Splash4PageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },

  // 🔹 ÁREA LOGADA (COM TAB BAR)
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  // 🔹 Outras rotas dentro da área logada
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'exercicio',
    loadChildren: () =>
      import('./pages/exercicios/exercicio.module').then(m => m.ExercicioPageModule)
  },
  {
    path: 'nutriente-track',
    loadChildren: () =>
      import('./pages/nutriente-track/nutriente-track.module').then(m => m.NutrienteTrackPageModule)
  },
  {
    path: 'receitas',
    loadChildren: () =>
      import('./pages/receitas/receitas.module').then(m => m.ReceitasPageModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'edit-personal-data',
    loadChildren: () =>
      import('./pages/edit-personal-data/edit-personal-data.module').then(m => m.EditPersonalDataPageModule)
  },
  {
    path: 'imc-calculation',
    loadChildren: () =>
      import('./pages/imc-calculation/imc-calculation.module').then(m => m.ImcCalculationPageModule)
  },
  {
    path: 'refeicao',
    loadChildren: () =>
      import('./pages/refeicao/refeicao.module').then(m => m.RefeicaoPageModule)
  },

  // 🔹 Fallback - Página de erro, caso a rota não seja encontrada
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
