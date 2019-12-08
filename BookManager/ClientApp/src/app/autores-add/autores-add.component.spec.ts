import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresAddComponent } from './autores-add.component';

describe('AutoresAddComponent', () => {
  let component: AutoresAddComponent;
  let fixture: ComponentFixture<AutoresAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoresAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoresAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
