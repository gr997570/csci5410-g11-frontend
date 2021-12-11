import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdFactorComponent } from './third-factor.component';

describe('ThirdFactorComponent', () => {
  let component: ThirdFactorComponent;
  let fixture: ComponentFixture<ThirdFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdFactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
