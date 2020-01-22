import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'writeDate'
})
export class WriteDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const now = moment(new Date(), 'YYYY/MM/DD h:mm');
    const created = moment(new Date(value), 'YYYY/MM/DD h:mm');
    const minuteDiff = now.diff(created, 'minutes');
    const hourDiff = now.diff(created, 'hours');
    if(minuteDiff < 60) {
      return `${minuteDiff}분 전`;
    } else if(hourDiff < 24) {
      return `${hourDiff}시간 전`;
    } else {
      return created.format("YYYY년 MM월 DD일");
    }
  }

}
