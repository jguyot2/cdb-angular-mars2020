import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderbodyComponent } from './underbody.component';

describe('BodyComponent', () => {
  let component: UnderbodyComponent;
  let fixture: ComponentFixture<UnderbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
