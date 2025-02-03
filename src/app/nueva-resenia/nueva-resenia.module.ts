import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaReseniaPageRoutingModule } from './nueva-resenia-routing.module';

import { NuevaReseniaPage } from './nueva-resenia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaReseniaPageRoutingModule
  ],
  declarations: [NuevaReseniaPage]
})
export class NuevaReseniaPageModule {}
