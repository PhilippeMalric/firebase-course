import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdVarNameComponent } from './dd-var-name.component';

describe('DdVarNameComponent', () => {
  let component: DdVarNameComponent;
  let fixture: ComponentFixture<DdVarNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdVarNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdVarNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
