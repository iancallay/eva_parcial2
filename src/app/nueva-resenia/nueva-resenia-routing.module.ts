import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaReseniaPage } from './nueva-resenia.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaReseniaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaReseniaPageRoutingModule {}
