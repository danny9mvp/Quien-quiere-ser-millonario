import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPerdioPage } from './modal-perdio.page';

describe('ModalPerdioPage', () => {
  let component: ModalPerdioPage;
  let fixture: ComponentFixture<ModalPerdioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPerdioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPerdioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
