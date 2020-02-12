import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        const defaultUrlSerializer = new DefaultUrlSerializer();
        return defaultUrlSerializer.parse(url.replace(/#/g, '%23'));
    }

    serialize(tree: UrlTree): any {
        const defaultUrlSerializer = new DefaultUrlSerializer();
        return defaultUrlSerializer.serialize(tree).replace(/%23/g, '#');
    }
}