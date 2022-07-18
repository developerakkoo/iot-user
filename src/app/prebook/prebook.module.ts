import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrebookPageRoutingModule } from './prebook-routing.module';

import { PrebookPage } from './prebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrebookPageRoutingModule
  ],
  declarations: [PrebookPage]
})
export class PrebookPageModule {}
