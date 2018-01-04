import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Util } from './core/util';

import { TimelineComponent }    from './timeline/timeline.component';
import { ListActivityComponent }    from './timeline/listActivities/listActivities.component';
import { ProyectComponent } from './createProyect/proyect.component';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    ListActivityComponent,
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
