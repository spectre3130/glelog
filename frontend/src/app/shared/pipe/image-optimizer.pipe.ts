import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageOptimizer'
})
export class ImageOptimizerPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value) {
      const [ width, isMarkdown = false] = args;
      if(isMarkdown) {
        const regex = /(?<=\!\[(.*?)\]\()https:\/\/images.glelog.dev\/(.*?)(?=\))/g;
        const images = value.match(regex);
        images.forEach(image => {
          value = value.replace(image, image + `?s=${width}`);
        });
      } else {
        value = value + `?s=${width}`;
      }
    }
    return value;
  }

}
