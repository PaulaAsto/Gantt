import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, ModalModule , AlertModule, 
  AccordionModule, ProgressbarModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { AppComponent } from './app.component';
import { Util } from './core/util';

import { ProyectComponent } from './pages/project/project.component';
import { ProjectModalComponent } from './pages/project/project_modal.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TareaModalComponent } from './pages/timeline/tarea_modal.component';
import { ActividadModalComponent } from './pages/timeline/actividad_modal.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProyectComponent,
    ProjectModalComponent,
    TimelineComponent,
    TareaModalComponent,
    ActividadModalComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Util
  ],
  entryComponents: [
    ProjectModalComponent,
    TareaModalComponent,
    ActividadModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
