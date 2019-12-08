import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosAddComponent } from './libros-add.component';

describe('LibrosAddComponent', () => {
  let component: LibrosAddComponent;
  let fixture: ComponentFixture<LibrosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
