import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { City } from "../shared/city";


@Injectable({providedIn: 'root'})
export class PostsService {

    public bSbj$ = new BehaviorSubject([])

    constructor() { }

    newBSub(city: City[] | any) {
        return this.bSbj$.next(city)
    }
}

