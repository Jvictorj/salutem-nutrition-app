import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receita-detail',
  templateUrl: './receita-detail.component.html',
  styleUrls: ['./receita-detail.component.scss'],
})
export class ReceitaDetailComponent implements OnInit {
  
  @Input() receita: any;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Log para debug se precisar verificar o que está chegando
    console.log('Detalhes da receita:', this.receita);
  }

  close() {
    this.modalController.dismiss();
  }
}