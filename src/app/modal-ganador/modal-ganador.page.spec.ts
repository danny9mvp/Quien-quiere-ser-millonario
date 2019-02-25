import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGanadorPage } from './modal-ganador.page';

describe('ModalGanadorPage', () => {
  let component: ModalGanadorPage;
  let fixture: ComponentFixture<ModalGanadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGanadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGanadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
