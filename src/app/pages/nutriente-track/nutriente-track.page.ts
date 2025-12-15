import { Component, OnInit, OnDestroy } from '@angular/core';
import { NutrienteService } from '../../services/api/nutriente.service';
import { RefeicaoService } from '../../services/user/refeicao.service';
import { AlertController, ToastController } from '@ionic/angular';
import { TipoRefeicao } from '../../services/user/refeicao.service';
import { Subscription } from 'rxjs';

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
export class NutrienteTrackPage implements OnInit, OnDestroy {

  // UI
  viewMode: 'resumo' | 'buscar' = 'resumo';
  isLoading = false;

  // Busca
  searchQuery = '';
  filteredAlimentos: any[] = [];

  // Resumo diário
  dailySummary: DailySummary = {
    caloriesConsumed: 0,
    caloriesGoal: 0,
    carbsConsumed: 0,
    carbsGoal: 0,
    proteinConsumed: 0,
    proteinGoal: 0,
    fatConsumed: 0,
    fatGoal: 0,
  };

  private sub!: Subscription;

  constructor(
    private nutrienteService: NutrienteService,
    private refeicaoService: RefeicaoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,  // Add ToastController to constructor
  ) {}

  ngOnInit() {
    this.loadDailyData();

    this.sub = this.refeicaoService.refeicoes$.subscribe(() => {
      this.updateResumo();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  loadDailyData() {
    this.dailySummary.caloriesGoal = 2000;
    this.dailySummary.carbsGoal = 250;
    this.dailySummary.proteinGoal = 100;
    this.dailySummary.fatGoal = 65;

    this.updateResumo(); // calcula o consumido real
  }

  // 🔎 BUSCA
  onSearch() {
    if (this.searchQuery.trim().length < 3) {
      this.filteredAlimentos = [];
      return;
    }

    this.isLoading = true;

    this.nutrienteService.getAlimentoByName(this.searchQuery).subscribe({
      next: (result) => {
        this.filteredAlimentos = result.map((alimento: any) => ({
          ...alimento,
          quantity: 100,
          unit: this.getUnitForCategory(alimento.category),
          energy_kcal_original: alimento.energy_kcal,
          protein_g_original: alimento.protein_g,
          carbohydrate_g_original: alimento.carbohydrate_g,
          lipid_g_original: alimento.lipid_g,
          fiber_g_original: alimento.fiber_g,
        }));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  // ➕ ADICIONAR
  async addToMeal(alimento: any) {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar alimento',
      message: 'Escolha a refeição',
      inputs: [
        {
          type: 'radio',
          label: 'Café da Manhã',
          value: 'Café da Manhã',
          checked: true
        },
        {
          type: 'radio',
          label: 'Almoço',
          value: 'Almoço'
        },
        {
          type: 'radio',
          label: 'Jantar',
          value: 'Jantar'
        },
        {
          type: 'radio',
          label: 'Lanche',
          value: 'Lanche'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: (refeicao: TipoRefeicao) => {
            if (alimento.quantity <= 0) {
              this.showToast('Por favor, insira uma quantidade válida');
              return false; 
            }

            this.refeicaoService.addAlimento(refeicao, { ...alimento });
            this.showToast('Alimento adicionado com sucesso');

            return true;
          }

        }
      ]
    });

    await alert.present();
  }

  // 🔄 ATUALIZA NUTRIENTES
  updateNutritionalValues(alimento: any) {
    if (!alimento.quantity || alimento.quantity <= 0) return;

    const factor = alimento.quantity / 100;
    alimento.energy_kcal = alimento.energy_kcal_original * factor;
    alimento.protein_g = alimento.protein_g_original * factor;
    alimento.carbohydrate_g = alimento.carbohydrate_g_original * factor;
    alimento.lipid_g = alimento.lipid_g_original * factor;
    alimento.fiber_g = alimento.fiber_g_original * factor;
  }

  // 🧠 UTIL
  getUnitForCategory(category: string): string {
    const liquids = ['Leite e derivados', 'Bebidas (alcoólicas e não alcoólicas)'];
    return liquids.includes(category) ? 'ml' : 'g';
  }

  getProgress(consumed: number, goal: number): number {
    return goal === 0 ? 0 : Math.min(consumed / goal, 1);
  }

  updateResumo() {
    const resumo = this.refeicaoService.getResumoDiario();

    this.dailySummary.caloriesConsumed = resumo.calories;
    this.dailySummary.carbsConsumed = resumo.carbs;
    this.dailySummary.proteinConsumed = resumo.protein;
    this.dailySummary.fatConsumed = resumo.fat;
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}