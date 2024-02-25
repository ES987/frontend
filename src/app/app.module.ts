import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppsContolComponent } from './Components/apps-contol/apps-contol.component';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
 
import {MatListModule} from '@angular/material/list';
import { HttpClientHelper } from './Logic/Helpers/HttpClientHelper';
import { ConfigurationService } from './Logic/Servises/ConfigurationService';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ArduinoConfigurationComponent } from './Components/arduino-configuration/arduino-configuration.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
 
import {MatFormFieldModule} from '@angular/material/form-field';
import { TestConfigurationComponent } from './Components/test-configuration/test-configuration.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    AppsContolComponent,
    ArduinoConfigurationComponent,
    TestConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDividerModule,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    NgFor,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule
  ],
  providers: [
    provideAnimationsAsync(),
    HttpClientHelper,
    ConfigurationService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
