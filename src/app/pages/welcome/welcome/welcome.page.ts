import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(private router: Router) { }

  letStart() {
    // Redireciona para o splash-1 conforme solicitado
    this.router.navigate(['/splash-1']);
  }

}