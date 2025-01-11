import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPatientComponent } from './enter-patient.component';

describe('EnterPatientComponent', () => {
  let component: EnterPatientComponent;
  let fixture: ComponentFixture<EnterPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
