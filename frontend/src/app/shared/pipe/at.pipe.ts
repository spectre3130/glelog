import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'at'
})
export class AtPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return '@' + value;
  }

}
