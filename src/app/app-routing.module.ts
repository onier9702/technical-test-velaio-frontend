import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
  },

  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskModule),
  },

  { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
