import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossVarComponent } from './cross-var.component';

describe('CrossVarComponent', () => {
  let component: CrossVarComponent;
  let fixture: ComponentFixture<CrossVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossVarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
