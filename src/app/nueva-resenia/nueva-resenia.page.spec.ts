import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaReseniaPage } from './nueva-resenia.page';

describe('NuevaReseniaPage', () => {
  let component: NuevaReseniaPage;
  let fixture: ComponentFixture<NuevaReseniaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaReseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
