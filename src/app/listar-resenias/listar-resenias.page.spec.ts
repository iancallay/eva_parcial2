import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarReseniasPage } from './listar-resenias.page';

describe('ListarReseniasPage', () => {
  let component: ListarReseniasPage;
  let fixture: ComponentFixture<ListarReseniasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReseniasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
