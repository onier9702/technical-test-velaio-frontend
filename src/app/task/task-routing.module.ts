import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListTaskComponent } from './list-task/list-task.component';
import { NewTaskComponent } from './new-task/new-task.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list-tasks', component: ListTaskComponent },
      { path: 'new-task', component: NewTaskComponent },

      { path: '**', redirectTo: 'list-tasks' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
