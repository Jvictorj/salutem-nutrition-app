import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribing to the authentication state
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  // Função de navegação para a página inicial
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToRefeicao() {
    this.router.navigate(['/refeicao'])
  }

  // Função de navegação para a página de nutrientes
  goToNutriente() {
    this.router.navigate(['/nutriente-track']);
  }

  // Função de navegação para a página de exercícios
  goToExercicio() {
    this.router.navigate(['/exercicio']);
  }

  // Função para adicionar refeição
  onAdd() {
    console.log('Adicionar refeição');
    // Adicione a lógica para a função de adicionar
  }

  // Função para logout
  logout() {
    this.authService.logout().then(() => {
      console.log('Usuário desconectado');
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
    });
  }
}
