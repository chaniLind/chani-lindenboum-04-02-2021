import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTemperature'
})
export class FormatTemperaturePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
