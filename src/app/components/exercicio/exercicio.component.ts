import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.component.html',
  styleUrls: ['./exercicio.component.scss'],
})
export class ExercicioComponent {

  @Input() treino: any; // Recebe os dados do treino (título, duração, nível...)

  constructor() { }

  // Removi o ngOnInit pois não estamos usando para nada.
  // Isso resolve o erro do ESLint e deixa o código mais leve.
}