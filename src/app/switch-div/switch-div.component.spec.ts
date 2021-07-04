import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDivComponent } from './switch-div.component';

describe('SwitchDivComponent', () => {
  let component: SwitchDivComponent;
  let fixture: ComponentFixture<SwitchDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
