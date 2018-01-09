import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Util } from './core/util';

import { ProyectComponent } from './pages/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    HttpModule
  ],
  providers: [
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
