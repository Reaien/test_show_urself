import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassRecoverPage } from './pass-recover.page';

const routes: Routes = [
  {
    path: '',
    component: PassRecoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassRecoverPageRoutingModule {}
