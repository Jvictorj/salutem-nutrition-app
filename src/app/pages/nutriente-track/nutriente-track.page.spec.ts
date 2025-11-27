import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutrienteTrackPage } from './nutriente-track.page';

describe('NutrienteTrackPage', () => {
  let component: NutrienteTrackPage;
  let fixture: ComponentFixture<NutrienteTrackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrienteTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
