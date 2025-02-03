import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarReseniasPage } from './listar-resenias.page';

const routes: Routes = [
  {
    path: '',
    component: ListarReseniasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarReseniasPageRoutingModule {}
