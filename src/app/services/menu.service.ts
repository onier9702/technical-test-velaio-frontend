import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public menu: any[] = [
    {
      title: 'Inicio',
      url: '/pages/home'
    },
    {
      title: 'Tareas',
      url: '/task/list-tasks'
    },
        
  ];
}
