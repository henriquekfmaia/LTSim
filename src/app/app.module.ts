import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SimulatorInterfaceComponent } from './simulator-interface/simulator-interface.component';
import { SimulatorCanvasComponent } from './simulator-canvas/simulator-canvas.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { ProcessService } from './services/process.service';
import { SimulatorService } from './services/simulator.service';
import { ParameterDetailComponent } from './parameter-detail/parameter-detail.component';
import { ProcessEditorComponent } from './process-editor/process-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SimulatorInterfaceComponent,
    SimulatorCanvasComponent,
    ProcessDetailComponent,
    ActionBarComponent,
    ParameterDetailComponent,
    ProcessEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
      ProcessDetailComponent
  ],
  providers: [ ProcessService, SimulatorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
