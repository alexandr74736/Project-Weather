import { Component, OnInit } from '@angular/core';
import { Coords } from '../Coords';
import { City } from '../city';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-weather',
  templateUrl: './page-weather.component.html',
  styleUrls: ['./page-weather.component.css'],
  providers: [HttpService]
})
export class PageWeatherComponent implements OnInit {

 
  city: City | undefined
  cityName: string = "Ижевск"
  lat:any
  lon:any
  coords: any


  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCityData(this.cityName).subscribe((data: City) => this.city=data)
  }

}
