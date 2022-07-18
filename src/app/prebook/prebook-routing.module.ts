import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrebookPage } from './prebook.page';

const routes: Routes = [
  {
    path: '',
    component: PrebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrebookPageRoutingModule {}
