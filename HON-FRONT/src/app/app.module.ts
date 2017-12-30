import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';

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
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
