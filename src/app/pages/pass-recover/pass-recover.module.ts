import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassRecoverPageRoutingModule } from './pass-recover-routing.module';

import { PassRecoverPage } from './pass-recover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PassRecoverPageRoutingModule
  ],
  declarations: [PassRecoverPage]
})
export class PassRecoverPageModule {}
