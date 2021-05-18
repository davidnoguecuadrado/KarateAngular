import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeportistaPage } from './deportista.page';

const routes: Routes = [
  {
    path: '',
    component: DeportistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeportistaPageRoutingModule {}
