import {Injectable} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class autocompleeteService{
  public sbj$ = new Subject<string>()
  
    constructor() {}
      
    data = [
        {
          name: 'Москва'
        },
        {
          name: 'Новосибирск'
        },
        {
          name: 'Казань'
        },
        {
          name: 'Нижний Новгород'
        },
        {
          name: 'Челябинск'
        },
        {
          name: 'Самара'
        },
        {
          name: 'Ижевск'
        },
        {
          name: 'Можга'
        }
      ];

      newSub(acResponse: string) {
        return this.sbj$.next(acResponse)
      }
}