import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComphomeComponent } from 'src/app/components/comphome/comphome.component'
import { CompuserComponent } from 'src/app/components/compuser/compuser.component'

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'main',
        component: ComphomeComponent
      },
      {
        path: 'user',
        component: CompuserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
