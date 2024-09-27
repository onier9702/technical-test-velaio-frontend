import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TaskService } from '../../services/task.service';

import { ITask } from '../../interfaces/task.interface';
import { Limit } from '../../enum/limit.enum';

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
    'person': ['', [] ],
    'initDate': ['', [] ],
    'endDate': ['', [] ],
  });

  constructor(
    private fb: FormBuilder,
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
}
