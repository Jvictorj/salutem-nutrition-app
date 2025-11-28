import { Component } from '@angular/core';

import { AuthService } from './services/user/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from './services/user/auth.service'; // Confirme se o caminho está correto
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  isAuthenticated = false;
  showMenu = false;

  // Rotas que NÃO devem mostrar o menu
  hiddenRoutes = [
    '/splash-1',
    '/splash-2',
    '/splash-3',
    '/splash-4',
    '/welcome',
    '/login',
    '/register',
    '/cadastro',
    '/forgot-password'
  ];


  
  isAuthenticated: boolean = false;


  constructor(
    private authService: AuthService, 
    private router: Router
  ) {

    // Monitorar se o usuário está logado
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      this.updateMenu();

    // Monitora o estado da autenticação para mostrar/esconder o menu inferior
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;

    });


    // Monitorar mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateMenu());
  }

  updateMenu() {
    const currentRoute = this.router.url.split('?')[0];

    const isHidden = this.hiddenRoutes.includes(currentRoute);

    this.showMenu = this.isAuthenticated && !isHidden;
  }

  onAdd() {

  // Ação do Botão Central (+)
  onAdd() {
    console.log('Botão Add Clicado');
    // Exemplo: Levar para a tela de adicionar alimentos

    this.router.navigate(['/nutriente-track']);
  }
}