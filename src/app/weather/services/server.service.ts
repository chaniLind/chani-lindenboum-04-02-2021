import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public apiKey: string = 'Z5lMiPfWkM54djMNcsMYVmw8aLkhVmhN';
  public url: string = "";

  // get location by ip adress
  getLocationByIpAdrres(ipAdress: number): Observable<any> {
    debugger;
    this.url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + this.apiKey + "&q=" + ipAdress;
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  // get cities for In autocomplete
  getCitiesAutoCompletion(SearchText: string): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.apiKey + '&q=' + SearchText + '&language=en-us'
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  // get current temperature by location key
  getCurrentTemperature(locationKey: string): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + this.apiKey + '&language=en-us&details=false'
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  //get temperature for the next 5 days by location key
  getTemperatureForTheNext5Days(locationKey: string, metricValue: boolean): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + this.apiKey + '&language=en-us&details=false&metric=' + metricValue;
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  // Perception of errors
  errorHandler(error: HttpErrorResponse) {
    debugger;
    return throwError(error);
  }

  constructor(private httpClient: HttpClient) {
  }

}
