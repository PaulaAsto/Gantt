import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, AccordionModule, ProgressbarModule ,
   PopoverModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';
import { Util } from './core/util';
import { FuncionesConfig } from './core/funciones.config';

import { ProyectComponent } from './pages/project/project.component';
import { ProjectModalComponent } from './pages/project/project_modal.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { TareaModalComponent } from './pages/timeline/tarea_modal.component';
import { ActividadModalComponent } from './pages/timeline/actividad_modal.component';
import { ListToDoComponent } from './pages/listtodo/listtodo.component';
import { AppRoutingModule } from './/app-routing.module';
import { MiniModalComponent } from './pages/listtodo/mini-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProyectComponent,
    ProjectModalComponent,
    TimelineComponent,
    TareaModalComponent,
    ActividadModalComponent,
    ListToDoComponent,
    MiniModalComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgDragDropModule.forRoot(),
    MyDateRangePickerModule,
    ColorPickerModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    Util,
    FuncionesConfig
  ],
  entryComponents: [
    ProjectModalComponent,
    TareaModalComponent,
    ActividadModalComponent,
    MiniModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
