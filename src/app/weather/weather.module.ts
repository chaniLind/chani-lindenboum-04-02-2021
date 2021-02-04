import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherByCityComponent } from './components/weather-by-city/weather-by-city.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatTemperaturePipe } from './filters/format-temperature.pipe';

@NgModule({
  declarations: [WeatherByCityComponent, FormatTemperaturePipe],
  imports: [
    CommonModule,
    WeatherRoutingModule,  
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class WeatherModule { }
