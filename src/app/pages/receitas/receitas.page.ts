import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../../services/api/receitas.service'; // Ajuste o caminho se necessário
import { ModalController } from '@ionic/angular';
import { ReceitaDetailComponent } from '../../components/receita-detail/receita-detail.component';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  
  receitas: any[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private receitasService: ReceitasService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Carrega sugestões iniciais (pode ser 'saudável', 'salada', etc.)
    this.searchQuery = 'saudável'; 
    this.getReceitas();
  }

  getReceitas() {
    if (!this.searchQuery.trim()) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.receitas = []; // Limpa lista anterior para mostrar skeleton

    this.receitasService.getReceitas(this.searchQuery).subscribe(
      (data: any) => {
        this.isLoading = false;
        // A API Spoonacular geralmente retorna em 'results'
        this.receitas = data.results || [];
        
        if (this.receitas.length === 0) {
          // Nenhum resultado encontrado
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Não foi possível carregar as receitas. Verifique sua conexão.';
        console.error('Erro Receitas:', error);
      }
    );
  }

  onSearch() {
    // Debounce manual simples: só busca se tiver texto
    if (this.searchQuery.trim().length > 2) {
      this.getReceitas();
    } else if (this.searchQuery.trim() === '') {
      this.receitas = [];
    }
  }

  async viewRecipe(receita: any) {
    // Busca detalhes completos antes de abrir (se a API exigir endpoint de info detalhada)
    // Se a lista já tiver tudo, pode passar direto.
    // Geralmente na lista vem só ID, Title e Image.
    // Se precisar de detalhes (instruções), talvez precise chamar o serviço aqui pelo ID.
    
    // Supondo que precise buscar detalhes:
    // this.isLoading = true;
    // this.receitasService.getRecipeDetails(receita.id).subscribe(...)
    
    // Por enquanto, passamos o objeto atual para o modal
    const modal = await this.modalController.create({
      component: ReceitaDetailComponent,
      componentProps: { receita: receita }
    });

    await modal.present();
  }
}