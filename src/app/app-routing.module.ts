import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-page/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'splash-1',
    loadChildren: () => import('./pages/splash-page/splash-1/splash-1.module').then(m => m.Splash1PageModule)
  },
  {
    path: 'splash-2',
    loadChildren: () => import('./pages/splash-page/splash-2/splash-2.module').then( m => m.Splash2PageModule)
  },
  {
    path: 'splash-3',
    loadChildren: () => import('./pages/splash-page/splash-3/splash-3.module').then( m => m.Splash3PageModule)
  },
  {
    path: 'splash-4',
    loadChildren: () => import('./pages/splash-page/splash-4/splash-4.module').then( m => m.Splash4PageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome-page/welcome/welcome.module').then( m => m.WelcomePageModule)
  },  {
    path: 'exercicio',
    loadChildren: () => import('./pages/exercicio/exercicio.module').then( m => m.ExercicioPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
