// src/app/components/receita-detail/receita-detail.component.ts
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receita-detail',
  templateUrl: './receita-detail.component.html',
  styleUrls: ['./receita-detail.component.scss'],
})
export class ReceitaDetailComponent {
  @Input() receita: any; // Receita que será recebida do componente pai

  constructor(private modalController: ModalController) {}

  // Fechar o modal
  close() {
    this.modalController.dismiss();
  }
}
