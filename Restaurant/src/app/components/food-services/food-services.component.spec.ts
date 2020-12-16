import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodServicesComponent } from './food-services.component';

describe('FoodServicesComponent', () => {
  let component: FoodServicesComponent;
  let fixture: ComponentFixture<FoodServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
