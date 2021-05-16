import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarViewComponent } from './var-view.component';

describe('VarViewComponent', () => {
  let component: VarViewComponent;
  let fixture: ComponentFixture<VarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
