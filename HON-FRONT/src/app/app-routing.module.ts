import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProyectComponent } from './pages/project/project.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { ListToDoComponent } from './pages/listtodo/listtodo.component';

const routes: Routes = [
  { path: 'project', component: ProyectComponent },
  { path: 'project/timeline/:id', component: TimelineComponent },
  { path: 'project/timeline/:id/:idTask/:idActivity', component: ListToDoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
