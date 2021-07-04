import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarTestComponent } from './var-test.component';

describe('VarTestComponent', () => {
  let component: VarTestComponent;
  let fixture: ComponentFixture<VarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
