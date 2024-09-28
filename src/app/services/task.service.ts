import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ICountAndTotalTask, ITask } from '../interfaces/task.interface';
import { IMessage } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) {}

  saveNewTask(data: ITask): Observable<IMessage|any> {
    const url = `${this._baseUrl}/task`;

    return this.http.post<IMessage>( url, data )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

  setTaskAsCompleted(taskId: number): Observable<IMessage|any> {
    const url = `${this._baseUrl}/task/${taskId}`;

    return this.http.patch<IMessage>( url, {} )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

  fetchAllTasks(
    limit: number,
    offset: number,
    filters?: any,
  ): Observable<ICountAndTotalTask> {
    const url = `${this._baseUrl}/task`;

    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
    
    if (filters) {  // Append filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<ICountAndTotalTask>( url, { params } )
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  };

  findOneTaskById(taskId: number): Observable<ITask> {
    const url = `${this._baseUrl}/task/${taskId}`;

    return this.http.get<ITask>( url)
      .pipe(
        map( resp => resp ),
        catchError( err => of(err.error) )
      );
  }

}
