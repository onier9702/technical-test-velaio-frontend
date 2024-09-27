import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public menu: any[] = [
    {
      title: 'Home',
      url: '/pages/home'
    },
    {
      title: 'Tasks',
      url: '/task/list-tasks'
    },
        
  ];
}
