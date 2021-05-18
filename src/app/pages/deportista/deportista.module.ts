import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeportistaPageRoutingModule } from './deportista-routing.module';

import { DeportistaPage } from './deportista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportistaPageRoutingModule
  ],
  declarations: [DeportistaPage]
})
export class DeportistaPageModule {}
