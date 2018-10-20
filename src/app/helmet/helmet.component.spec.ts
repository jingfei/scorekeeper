import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelmetComponent } from './helmet.component';

describe('HelmetComponent', () => {
  let component: HelmetComponent;
  let fixture: ComponentFixture<HelmetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelmetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
