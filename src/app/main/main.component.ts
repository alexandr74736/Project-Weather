import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from '../shared/city';
import { HttpService } from '../services/http.service';
import { localService } from '../services/local.service';
import { PostsService } from '../services/posts.service';
import { autocompleeteService } from '../services/autocompleete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ autocompleeteService]
})
export class MainComponent implements OnInit {

  posts: City[] | any = [] 
  post: any
  pSub?: Subscription 
  dSub?: Subscription 
  keyword = 'name';
  data = this.acService.data
  arr: any

  searchField: any
  ddMenu: any
  
  constructor(
                private localService: localService,
                private httpService: HttpService,
                private postsService: PostsService,
                private acService: autocompleeteService,
                private router: Router
              ) { }

   
  ngOnInit(): void {
    this.changeModuleStyle()
    this.postsInit()
  }
  
  postsInit() {
    this.dSub = this.postsService.bSbj$.subscribe(arr => {
      this.arr = arr

      if (this.arr.length == 0) {
        this.posts = []
        let locArr = this.localService.getAll();
        locArr.forEach( (item) => {
          this.posts.push(item)
        })
        return this.postsService.newBSub(this.posts)
      } else {
        arr.forEach( (item) => {
          let name = item["name"]
          this.posts = []
          return this.httpService.getCityData(name).subscribe((data: City) => {
            this.post=data
            this.posts.push(this.post)
          })
        })
      }
    })
  }

  selectEvent(item:any) {
    const acResponse: string = item.name
    this.acService.newSub(acResponse)
    return this.router.navigate( ['/page', acResponse] )
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused($event:any){
    let e = $event.currentTarget
    console.log(e)
    // do something when input is focused
  }

  goToCity($event:any) {
    let e = $event.currentTarget.firstElementChild.firstElementChild.innerHTML
    return this.router.navigate( ['/page', e] )
  }

  changeModuleStyle() {
    this.ddMenu = document.querySelector(".ng-autocomplete")
    this.ddMenu = this.ddMenu.firstElementChild.childNodes
    this.ddMenu[0].firstElementChild.style.backgroundColor = '#2A2F45';
    this.ddMenu[0].firstElementChild.style.color = '#8A91AB';

    // not found - padding: 0; border: none; background: #30354B;, скрыть скролл
    return this.ddMenu
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
