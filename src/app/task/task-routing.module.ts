import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListTaskComponent } from './list-task/list-task.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list-tasks', component: ListTaskComponent },

      { path: '**', redirectTo: 'list-tasks' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
