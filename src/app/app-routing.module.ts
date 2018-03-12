import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulatorInterfaceComponent } from './simulator-interface/simulator-interface.component';

const routes: Routes = [
  { path: '', component: SimulatorInterfaceComponent },
  // { path: '', redirectTo: '/simulator', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
