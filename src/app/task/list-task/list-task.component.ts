import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from '../../services/task.service';

import { ModalDataInfoComponent } from '../../shared/modal-data-info/modal-data-info.component';
import { ModalConfirmComponent } from '../../shared/modal-confirm/modal-confirm.component';

import { ITask } from '../../interfaces/task.interface';
import { IPerson } from '../../interfaces/person.interface';

import { Limit } from '../../enum/limit.enum';
import Swal from 'sweetalert2';
import { StatusTask } from '../../enum/status-task.enum';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent {
  
  public tasks: ITask[] = [];

  // PAGINATION
  public limit: number = Limit.FOUR;
  public offset: number = 0;
  public total: number = 0;
  public isLoading: boolean = false;

  // FILTERS
  public filtersOpen: boolean = false;
  public filters: any = {};
  public isActiveFilters: boolean = false;
  public searchForm: FormGroup = this.fb.group({
    'name': ['', [] ],
    'status': ['', [] ],
    'initDate': ['', [] ],
    'endDate': ['', [] ],
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  fetchAllTasks(): void {
    this.isLoading = true;
    
    this.taskService.fetchAllTasks(this.limit, this.offset, this.filters)
      .subscribe( resp => {
        if (resp && resp.count >= 0) {
          this.total = resp.count;
          this.tasks = resp.tasks;
        }

        this.isLoading = false;
      });
  }

  // FILTERS
  openCloseFilters(): void {
    this.filtersOpen = !this.filtersOpen;
  }

  searchFormSubmit(): void {
    this.filters = this.searchForm.value;
    
    // Set offset to 0 to allow pagination by filters
    this.offset = 0;
    this.isActiveFilters = true;
    this.fetchAllTasks();
  }

  restartFilters(): void {
    // Set offset to 0 to allow pagination by filters
    this.offset = 0;
    this.isActiveFilters = false;
    this.filters = {};
    this.searchForm.reset();
    this.fetchAllTasks();
  }

  // DETECT CHANGE PAGE
  detectChangeOffset(offset: number) {
    this.offset = offset;

    this.fetchAllTasks();
  }

  seePersons(persons: IPerson[]): void {
    // Mat Dialog solution
    let dialogRef = this.dialog.open( ModalDataInfoComponent, {
      width: '48rem',
      autoFocus: false,
      data: persons,
    } );

    dialogRef.updatePosition({ top: '100px' });
  }

  markTaskAsCompleted(task: ITask): void {
    if (task.status === StatusTask.COMPLETED) {
      Swal.fire('Aviso', 'La tarea ya se encuentra completada', 'warning');

      return;
    }

    // Mat Dialog solution
    let dialogRef = this.dialog.open( ModalConfirmComponent, {
      width: '40rem',
      height: '22rem',
      autoFocus: false,
      data: `¿Estás seguro/a de que deseas marcar como completada esta tarea con nombre: ${task.name} ?`
    } );

    dialogRef.updatePosition({ top: '100px' });
    dialogRef.afterClosed().subscribe( resp => {
      if ( resp ) { // user confirm Cancel or Continue
        this.taskService.setTaskAsCompleted(task.id)
          .subscribe( (resp: any) => {
            if ( resp && resp.msg ) {
              Swal.fire('Completada', resp.msg, 'success');
              this.fetchAllTasks();
            } else {
              Swal.fire('Error', resp.message , 'error' );
            };
          });
      };
    });
  }
}
