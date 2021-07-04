import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossVarMultiComponent } from './cross-var-multi.component';

describe('CrossVarComponent', () => {
  let component: CrossVarMultiComponent;
  let fixture: ComponentFixture<CrossVarMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossVarMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossVarMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
