import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloveComponent } from './glove.component';

describe('GloveComponent', () => {
  let component: GloveComponent;
  let fixture: ComponentFixture<GloveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
