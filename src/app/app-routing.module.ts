import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimulatorInterfaceComponent } from './simulator-interface/simulator-interface.component';
import { ProcessEditorComponent } from './process-editor/process-editor.component';

const routes: Routes = [
  { path: 'simulator', component: SimulatorInterfaceComponent },
  { path: 'editor', component: ProcessEditorComponent },
  { path: '*', redirectTo: '/index.html'},
  { path: '', redirectTo: '/index.html', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
