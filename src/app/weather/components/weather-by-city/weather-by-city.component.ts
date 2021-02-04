import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IpServiceService } from '../../services/ip-service.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-weather-by-city',
  templateUrl: './weather-by-city.component.html',
  styleUrls: ['./weather-by-city.component.scss']
})
export class WeatherByCityComponent implements OnInit {

  public currentTemperature: number = 0;
  public currentTemperaCelsius: number = 0;
  public curTemperatureFahrenheit: number = 0;
  public myControl = new FormControl();
  public currentCity: any;
  public citys: any[] = [];
  public theNext5Days: any[] = [];
  public theNext5DaysCelsius: any[] = [];
  public theNext5DaysFahrenheit: any[] = [];
  public currLat: number = 0;
  public currLng: number = 0;
  public ipAddress: number = 0;

  constructor(private myServer: ServerService, private myIpService: IpServiceService) { }

  ngOnInit(): void {
    this.myIpService.getIPAddress().subscribe((res: any) => {
      debugger;
      this.ipAddress = res.ip;
      this.myServer.getLocationByIpAdrres(this.ipAddress).subscribe((Response: any) => {
        this.onSelectValueAT(Response);
      })
    });
  }

  public onKeyPressAt(): void {
    this.myServer.getCitiesAutoCompletion(this.myControl.value).subscribe((Response: any) => {
      this.citys = Response;
    })
  }

  public onSelectValueAT(city: any): void {
    debugger;
    this.myControl.setValue(city.LocalizedName);
    this.currentCity = city;
    this.getCurrentTemperature(city);
    this.getTemperatureForTheNext5Days(city, true); // get temperature by Celsius
  }

  public getCurrentTemperature(city: any) {
    this.myServer.getCurrentTemperature(city.Key).subscribe((Response: any) => {
      debugger;
      this.currentTemperaCelsius = Response[0].Temperature.Metric.Value;
      this.curTemperatureFahrenheit = Response[0].Temperature.Imperial.Value;
      this.currentTemperature = this.currentTemperaCelsius;
    })
  }

  public getTemperatureForTheNext5Days(city: any, metricValue: boolean) {
    debugger;
    this.myServer.getTemperatureForTheNext5Days(city.Key, metricValue).subscribe((Response: any) => {
      debugger;
      if (metricValue){
        this.theNext5DaysCelsius = Response.DailyForecasts;
        this.theNext5Days = Response.DailyForecasts;
      }
      else{
        this.theNext5DaysFahrenheit = Response.DailyForecasts;
        this.theNext5Days = Response.DailyForecasts;
      }
    })
  }

  public getCelsius() {
    debugger;
    this.currentTemperature = this.currentTemperaCelsius;
    this.theNext5Days = this.theNext5DaysCelsius;
  }

  public getFahrenheit() {
    debugger;
    this.currentTemperature = this.curTemperatureFahrenheit;
    this.getTemperatureForTheNext5Days(this.currentCity, false); 
  }

}
