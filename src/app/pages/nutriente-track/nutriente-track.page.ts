import { Component, OnInit } from '@angular/core';
import { NutrienteService } from '../../services/api/nutriente.service';
import { RefeicaoService } from '../../services/user/refeicao.service';

interface DailySummary {
  caloriesConsumed: number;
  caloriesGoal: number;
  carbsConsumed: number;
  carbsGoal: number;
  proteinConsumed: number;
  proteinGoal: number;
  fatConsumed: number;
  fatGoal: number;
}

@Component({
  selector: 'app-nutriente-track',
  templateUrl: './nutriente-track.page.html',
  styleUrls: ['./nutriente-track.page.scss'],
})
export class NutrienteTrackPage implements OnInit {
  // Controle de Visualização
  viewMode: string = 'resumo';
  
  // Dados de Pesquisa
  searchQuery: string = '';
  alimentos: any[] = [];
  filteredAlimentos: any[] = [];

  // Objeto vazio no início
  dailySummary: DailySummary = {
    caloriesConsumed: 0,
    caloriesGoal: 0,
    carbsConsumed: 0,
    carbsGoal: 0,
    proteinConsumed: 0,
    proteinGoal: 0,
    fatConsumed: 0,
    fatGoal: 0
  };

  constructor(
    private nutrienteService: NutrienteService,
    private refeicaoService: RefeicaoService
  ) {}

  ngOnInit() {
    // Carrega os dados iniciais ao abrir a página
    this.loadDailyData();
  }

  loadDailyData() {
    // Simula uma busca no banco de dados
    this.dailySummary = {
      caloriesConsumed: 1450,
      caloriesGoal: 2000,
      carbsConsumed: 150,
      carbsGoal: 250,
      proteinConsumed: 75,
      proteinGoal: 100,
      fatConsumed: 45,
      fatGoal: 65
    };
  }

  // --- Lógica de Busca ---

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredAlimentos = [];
      return;
    }

    this.nutrienteService.getAlimentoByName(this.searchQuery).subscribe(
      (result) => {
        this.filteredAlimentos = result.map((alimento: any) => ({
          ...alimento,
          quantity: 100,
          unit: this.getUnitForCategory(alimento.category),
          // Salva valores originais
          energy_kcal_original: alimento.energy_kcal,
          protein_g_original: alimento.protein_g,
          carbohydrate_g_original: alimento.carbohydrate_g,
          lipid_g_original: alimento.lipid_g,
          fiber_g_original: alimento.fiber_g,
        }));
      },
      (error) => {
        console.error('Erro na busca:', error);
      }
    );
  }

  // --- Lógica de Adição ---

  addToMeal(alimento: any) {
    const nomeRefeicao = 'Lanche';
    this.refeicaoService.addAlimento(nomeRefeicao, alimento);
    console.log(`Adicionado: ${alimento.description}`);
    this.viewMode = 'resumo';
  }

  updateNutritionalValues(alimento: any) {
    if (!alimento.quantity || alimento.quantity <= 0) return;

    const factor = alimento.quantity / 100;
    alimento.energy_kcal = alimento.energy_kcal_original * factor;
    alimento.protein_g = alimento.protein_g_original * factor;
    alimento.carbohydrate_g = alimento.carbohydrate_g_original * factor;
    alimento.lipid_g = alimento.lipid_g_original * factor;
    alimento.fiber_g = alimento.fiber_g_original * factor;
  }

  // --- Utilitários ---

  getUnitForCategory(category: string): string {
    const liquids = ['Leite e derivados', 'Bebidas (alcoólicas e não alcoólicas)'];
    return liquids.includes(category) ? 'ml' : 'g';
  }

  getProgress(consumed: number, goal: number): number {
    if (goal === 0) return 0;
    const progress = consumed / goal;
    return progress > 1 ? 1 : progress;
  }
}