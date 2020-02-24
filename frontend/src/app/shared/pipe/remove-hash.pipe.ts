import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHash'
})
export class RemoveHashPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return String(value).replace('#', '');
  }

}
