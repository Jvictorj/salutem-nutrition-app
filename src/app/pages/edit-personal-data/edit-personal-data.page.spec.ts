import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPersonalDataPage } from './edit-personal-data.page';

describe('EditPersonalDataPage', () => {
  let component: EditPersonalDataPage;
  let fixture: ComponentFixture<EditPersonalDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
