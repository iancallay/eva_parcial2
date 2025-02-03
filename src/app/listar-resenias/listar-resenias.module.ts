import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarReseniasPageRoutingModule } from './listar-resenias-routing.module';

import { ListarReseniasPage } from './listar-resenias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarReseniasPageRoutingModule
  ],
  declarations: [ListarReseniasPage]
})
export class ListarReseniasPageModule {}
