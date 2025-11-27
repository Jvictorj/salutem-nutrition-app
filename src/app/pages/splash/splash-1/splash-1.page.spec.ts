import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Splash1Page } from './splash-1.page';

describe('Splash1Page', () => {
  let component: Splash1Page;
  let fixture: ComponentFixture<Splash1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Splash1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
