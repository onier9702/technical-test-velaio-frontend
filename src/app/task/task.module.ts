import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskRoutingModule } from './task-routing.module';

import { ListTaskComponent } from './list-task/list-task.component';
import { PaginationComponent } from "../shared/pagination/pagination.component";
import { HeaderComponent } from "../shared/header/header.component";
import { NewTaskComponent } from './new-task/new-task.component';


@NgModule({
  declarations: [
    ListTaskComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    PaginationComponent,
    HeaderComponent,
]
})
export class TaskModule { }
