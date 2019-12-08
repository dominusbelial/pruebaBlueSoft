import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosEditComponent } from './libros-edit.component';

describe('LibrosEditComponent', () => {
  let component: LibrosEditComponent;
  let fixture: ComponentFixture<LibrosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
