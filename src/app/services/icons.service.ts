import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class iconsService{
    icons = {
        "01d": "Clear",
        "01n": "Clear",
        "02d": "Clouds",
        "02n": "Clouds",
        "03d": "Clouds",
        "03n": "Clouds",
        "04d": "Clouds",
        "04n": "Clouds",
        "09d": "Drizzle",
        "09n": "Drizzle",
        "10d": "Rain",
        "10n": "Rain",
        "11d": "Thunderstorm",
        "11n": "Thunderstorm",
        "13d": "Snow",
        "13n": "Snow",
        "50d": "Mist-Smoke-Haze-Fog",
        "50n": "Mist-Smoke-Haze-Fog",
    };

    
    
    constructor() {}
        
      checkIcon(iconName: string) {
        const map = new Map(Object.entries(this.icons));
        const res = map.get(iconName)
        return res
      }
}