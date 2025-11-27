import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Splash4Page } from './splash-4.page';

describe('Splash4Page', () => {
  let component: Splash4Page;
  let fixture: ComponentFixture<Splash4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Splash4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
