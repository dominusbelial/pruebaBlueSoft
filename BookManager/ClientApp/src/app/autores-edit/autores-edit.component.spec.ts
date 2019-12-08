import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresEditComponent } from './autores-edit.component';

describe('AutoresEditComponent', () => {
  let component: AutoresEditComponent;
  let fixture: ComponentFixture<AutoresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
