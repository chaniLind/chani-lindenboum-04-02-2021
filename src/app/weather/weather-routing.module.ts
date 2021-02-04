import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherByCityComponent } from './components/weather-by-city/weather-by-city.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherByCityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
