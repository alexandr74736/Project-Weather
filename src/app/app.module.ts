import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }   from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PageWeatherComponent } from './page-weather/page-weather.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageWeatherComponent,
    SvgIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    AutocompleteLibModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
