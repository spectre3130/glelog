import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Asia/Seoul');

@Pipe({
  name: 'postDate'
})
export class PostDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {  
    const now = moment(new Date(), 'YYYY/MM/DD h:mm');
    const date = moment(new Date(value), 'YYYY/MM/DD h:mm');
    const minuteDiff = now.diff(date, 'minutes');
    const hourDiff = now.diff(date, 'hours');
    if(minuteDiff < 60) return `${minuteDiff}분 전`;
    else if(hourDiff < 24) return `${hourDiff}시간 전`;
    else return date.format("YYYY년 MM월 DD일");
  }

}
