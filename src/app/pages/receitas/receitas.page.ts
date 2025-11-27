import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../../service/services/receitas.service';
import { ModalController } from '@ionic/angular';
import { ReceitaDetailComponent } from '../../component/components/receita-detail/receita-detail.component'; // Importar o modal

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  receitas: any[] = []; // Lista de receitas
  searchQuery: string = ''; // Termo de pesquisa
  isLoading: boolean = false; // Indicador de carregamento
  errorMessage: string = ''; // Mensagem de erro

  constructor(
    private receitasService: ReceitasService,
    private modalController: ModalController // Injeção do ModalController
  ) {}

  ngOnInit() {
    // Carregar receitas iniciais ou recomendadas
    this.getReceitas();
  }

  // Função para buscar receitas
  getReceitas() {
    this.isLoading = true;
    this.errorMessage = '';
    this.receitasService.getReceitas(this.searchQuery).subscribe(
      (data) => {
        this.isLoading = false;
        this.receitas = data.results; // Supondo que a resposta tenha uma chave 'results'
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar receitas. Tente novamente mais tarde.';
        console.error(error);
      }
    );
  }

  // Função para ser chamada quando o usuário digitar na barra de pesquisa
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.receitas = [];
    } else {
      this.getReceitas(); // Recarrega as receitas com a pesquisa
    }
  }

  // Função para abrir o modal com os detalhes da receita
  async viewRecipe(receita: any) {
    const modal = await this.modalController.create({
      component: ReceitaDetailComponent, // O componente do modal
      componentProps: { receita: receita } // Passando a receita como propriedade para o modal
    });

    await modal.present();

    // Optional: Captura o retorno ao fechar o modal
    const { data } = await modal.onDidDismiss();
    console.log('Retorno do modal', data);
  }
}

