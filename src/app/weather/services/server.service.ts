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

  public apiKey: string = 'PNvX10ynQFIFa7bqJHBS9MMFpKm4F3ZY';
  public url: string = "";

  getSLocationByIpAdrres(ipAdress: number): Observable<any> {
    debugger;
    this.url =  "http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=" + this.apiKey + "&q=213.151.49.246"
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }
  
  getCitiesAutoCompletion(SearchText: string): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.apiKey + '&q=' + SearchText + '&language=en-us'
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  getCurrentTemperature(locationKey: string): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + this.apiKey + '&language=en-us&details=false'
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }

  getTemperatureForTheNext5Days(locationKey: string, metricValue: boolean): Observable<any> {
    this.url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + this.apiKey + '&language=en-us&details=false&metric=' + metricValue;
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    debugger;
    return throwError(error);
  }

  constructor(private httpClient: HttpClient) {
  }

}
