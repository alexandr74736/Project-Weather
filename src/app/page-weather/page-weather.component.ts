import { Component, OnDestroy, OnInit } from '@angular/core';
import { City } from '../shared/city';
import { HttpService } from '../services/http.service';
import { Subscription, switchMap } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page-weather',
  templateUrl: './page-weather.component.html',
  styleUrls: ['./page-weather.component.css'],
  providers: []
})
export class PageWeatherComponent implements OnInit, OnDestroy {

  
 
  city: City | any
  cityName: any
  bookmark: string = "Bookmark"
  id: any
  icon: any
  pSub?: Subscription
  dSub?: Subscription
  posts: string[] = []


  arr: any

  constructor( private httpService: HttpService, 
               private postsService: PostsService,
               private route: ActivatedRoute
               ) { }

  ngOnInit() {
    this.getBSub()
    this.getData()
  }

  getBSub() {
    this.dSub = this.postsService.bSbj$.subscribe(arr => {
      this.arr = arr
      return this.arr
    })
  }

  getData() {
    this.pSub = this.route.paramMap.pipe( switchMap(params => params.getAll('id') )
    ).subscribe((count: string) => {
      this.cityName = count
      
      return this.httpService.getCityData(this.cityName).subscribe((data: City) => {
        this.city=data
        
      })
    });
  }

  check($event:any) {
    let e = $event.target.checked
    
    if (e === true) {
    
      if (this.arr.includes(this.city.name)) {
        return
      }
      this.bookmark = "Bookmark_use"
      this.arr.push(this.city)
      this.posts = this.arr
      localStorage.setItem(`${this.city.name}`, JSON.stringify(this.city))
      return this.postsService.newBSub(this.posts)

    } else {
        this.bookmark = "Bookmark"
        let idx = this.arr.indexOf(this.city.name)
        this.arr.splice(idx,1)
        this.posts = this.arr
        localStorage.removeItem(`${this.city.name}`)
        return this.postsService.newBSub(this.posts)
    }
  }

  checkActive():any | undefined {
    let name = localStorage.getItem(this.city?.name)

    if (name !== null) {
      this.bookmark = "Bookmark_use"
      return true
    } else {
      this.bookmark = "Bookmark"
      return false
    }
  }

  ngOnDestroy() {
    if (this.pSub) {
      return this.pSub.unsubscribe()
    }
    if (this.dSub) {
      return this.dSub.unsubscribe()
    }
  }
}
