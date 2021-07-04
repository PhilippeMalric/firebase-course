import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauCroiseComponent } from './tableau-croise.component';

describe('TableauCroiseComponent', () => {
  let component: TableauCroiseComponent;
  let fixture: ComponentFixture<TableauCroiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauCroiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauCroiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
