import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExercicioPage } from './exercicio.page';

describe('ExercicioPage', () => {
  let component: ExercicioPage;
  let fixture: ComponentFixture<ExercicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
