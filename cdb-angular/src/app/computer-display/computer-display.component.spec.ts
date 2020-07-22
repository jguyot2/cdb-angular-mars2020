import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerDisplayComponent } from './computer-display.component';

describe('ComputerDisplayComponent', () => {
  let component: ComputerDisplayComponent;
  let fixture: ComponentFixture<ComputerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
