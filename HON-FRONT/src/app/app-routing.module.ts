import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProyectComponent } from './pages/project/project.component'
import { TimelineComponent } from './pages/timeline/timeline.component'

const routes: Routes = [
  { path: 'project', component: ProyectComponent },
  { path: 'project/timeline/:id', component: TimelineComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
