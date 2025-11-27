import { Component } from '@angular/core';
import { AuthService } from './services/user/auth.service'; // Confirme se o caminho está correto
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    // Monitora o estado da autenticação para mostrar/esconder o menu inferior
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  // Ação do Botão Central (+)
  onAdd() {
    console.log('Botão Add Clicado');
    // Exemplo: Levar para a tela de adicionar alimentos
    this.router.navigate(['/nutriente-track']);
  }
}