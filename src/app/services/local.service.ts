import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

  
@Injectable({providedIn: 'root'})
export class localService{
  
    constructor(private http: HttpClient){ }
    
    getAll() {
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            let a = localStorage.getItem(keys[i])
            a = JSON.parse(a || '{}')
            values.push( a );
        }

        return values;
    }
}