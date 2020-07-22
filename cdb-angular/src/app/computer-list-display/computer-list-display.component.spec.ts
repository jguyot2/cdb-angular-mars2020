import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerListDisplayComponent } from './computer-list-display.component';

describe('ComputerListDisplayComponent', () => {
  let component: ComputerListDisplayComponent;
  let fixture: ComponentFixture<ComputerListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
