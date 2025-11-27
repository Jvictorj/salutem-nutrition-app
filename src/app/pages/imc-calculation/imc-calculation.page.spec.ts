import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImcCalculationPage } from './imc-calculation.page';

describe('ImcCalculationPage', () => {
  let component: ImcCalculationPage;
  let fixture: ComponentFixture<ImcCalculationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImcCalculationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
