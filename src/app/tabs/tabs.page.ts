import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service'; // Importando o serviço de autenticação

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  // Definindo as variáveis para controle de autenticação e menu
  isAuthenticated: boolean = false;  // Inicializa como false
  showMenu: boolean = true; // Lógica para exibir o menu, você pode alterar conforme necessário

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Inscrevendo no Observable isAuthenticated$ para receber mudanças no estado de autenticação
    this.authService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
