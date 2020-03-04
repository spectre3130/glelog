import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageOptimizer'
})
export class ImageOptimizerPipe implements PipeTransform {

  transform(origin: string, ...args: unknown[]): unknown {
    if(origin) {
      const [ width, isMarkdown = false] = args;
      origin = this.optimize(origin, width, isMarkdown);
    }
    return origin;
  }

  optimize(origin, width, isMarkdown): string {
    if(isMarkdown) {
      const regex = /(?<=\!\[(.*?)\]\()https:\/\/images.glelog.dev\/(.*?)(?=\))/g;
      const images = origin.match(regex);
      return this.replaceMarkdownImage(origin, images, width);
    } else {
      return origin + `?s=${width}`;
    }
  }

  replaceMarkdownImage(origin, images, width): string {
    if(images) {
      images.forEach(image => {
        origin = origin.replace(image, image + `?s=${width}`);
      });
    }
    return origin;
  }

}
