import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalForm } from './festival-form';

describe('FestivalForm', () => {
  let component: FestivalForm;
  let fixture: ComponentFixture<FestivalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
