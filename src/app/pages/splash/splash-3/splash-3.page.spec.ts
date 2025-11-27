import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Splash3Page } from './splash-3.page';

describe('Splash3Page', () => {
  let component: Splash3Page;
  let fixture: ComponentFixture<Splash3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Splash3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
