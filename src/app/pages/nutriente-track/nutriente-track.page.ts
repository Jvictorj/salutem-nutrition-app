import { Component } from '@angular/core';
import { NutrienteService } from '../../service/services/nutriente.service';
import { RefeicaoService } from '../../services/refeicao.service';

@Component({
  selector: 'app-nutriente-track',
  templateUrl: './nutriente-track.page.html',
  styleUrls: ['./nutriente-track.page.scss'],
})
export class NutrienteTrackPage {
  searchQuery: string = ''; // Pesquisa do usuário
  alimentos: any[] = []; // Lista completa de alimentos
  filteredAlimentos: any[] = []; // Lista filtrada por categoria
  selectedCategory: string = ''; // Categoria selecionada

  // Lista de categorias disponíveis
  categories: string[] = [
    'Alimentos preparados',
    'Bebidas (alcoólicas e não alcoólicas)',
    'Carnes e derivados',
    'Cereais e derivados',
    'Frutas e derivados',
    'Gorduras e óleos',
    'Leguminosas e derivados',
    'Leite e derivados',
    'Miscelâneas',
    'Nozes e sementes',
    'Outros alimentos industrializados',
    'Ovos e derivados',
    'Pescados e frutos do mar',
    'Produtos açucarados',
    'Verduras, hortaliças e derivados',
  ];

  constructor(
    private nutrienteService: NutrienteService,
    private refeicaoService: RefeicaoService
  ) {}

  // Buscar alimentos ao digitar
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.alimentos = [];
      this.filteredAlimentos = [];
      return;
    }

    this.nutrienteService.getAlimentoByName(this.searchQuery).subscribe(
      (result) => {
        this.alimentos = result.map((alimento: any) => ({
          ...alimento,
          quantity: 100, // Quantidade padrão
          unit: this.getUnitForCategory(alimento.category), // Unidade dinâmica baseada na categoria
          energy_kcal_original: alimento.energy_kcal,
          protein_g_original: alimento.protein_g,
          carbohydrate_g_original: alimento.carbohydrate_g,
          lipid_g_original: alimento.lipid_g,
          fiber_g_original: alimento.fiber_g,
        }));
        this.filteredAlimentos = [...this.alimentos];
      },
      (error) => {
        console.error('Erro ao carregar dados', error);
      }
    );
  }

  // Adicionar alimento ao serviço de refeição
  addToMeal(alimento: any) {
    const nomeRefeicao = 'Café da Manhã'; // Nome da refeição, pode ser dinâmico
    this.refeicaoService.addAlimento(nomeRefeicao, alimento);
    console.log(`Alimento adicionado à refeição: ${nomeRefeicao}`, alimento);
  }


  // Verificar se a categoria é líquida e definir unidade
  getUnitForCategory(category: string): string {
    const liquidCategories = ['Leite e derivados', 'Bebidas (alcoólicas e não alcoólicas)'];
    return liquidCategories.includes(category) ? 'ml' : 'g';
  }

  // Filtrar alimentos por categoria
  filterByCategory() {
    if (this.selectedCategory === '') {
      this.filteredAlimentos = [...this.alimentos];
    } else {
      this.filteredAlimentos = this.alimentos.filter(
        (alimento) => alimento.category === this.selectedCategory
      );
    }
  }

  // Atualizar valores nutricionais com base na quantidade
  updateNutritionalValues(alimento: any) {
    if (!alimento.quantity || isNaN(alimento.quantity) || alimento.quantity <= 0) {
      alimento.energy_kcal = alimento.energy_kcal_original;
      alimento.protein_g = alimento.protein_g_original;
      alimento.carbohydrate_g = alimento.carbohydrate_g_original;
      alimento.lipid_g = alimento.lipid_g_original;
      alimento.fiber_g = alimento.fiber_g_original;
      return;
    }

    const factor = alimento.quantity / 100;
    alimento.energy_kcal = alimento.energy_kcal_original * factor;
    alimento.protein_g = alimento.protein_g_original * factor;
    alimento.carbohydrate_g = alimento.carbohydrate_g_original * factor;
    alimento.lipid_g = alimento.lipid_g_original * factor;
    alimento.fiber_g = alimento.fiber_g_original * factor;
  }
}
