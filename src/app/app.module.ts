import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SimulatorInterfaceComponent } from './simulator-interface/simulator-interface.component';
import { SimulatorCanvasComponent } from './simulator-canvas/simulator-canvas.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { ProcessService } from './services/process.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SimulatorInterfaceComponent,
    SimulatorCanvasComponent,
    ProcessDetailComponent,
    ActionBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ProcessService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
