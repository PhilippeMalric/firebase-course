import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestddComponent } from './testdd.component';

describe('TestddComponent', () => {
  let component: TestddComponent;
  let fixture: ComponentFixture<TestddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
