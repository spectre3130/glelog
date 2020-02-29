import { MarkedRenderer, MarkedOptions } from 'ngx-markdown';
import { AnchorService } from '../service/anchor.service';

export function markedOptionsFactory(anchorService: AnchorService): MarkedOptions {

    const renderer = new MarkedRenderer();

    // fix `href` for absolute link with fragments so that _copy-paste_ urls are correct
    renderer.link = (href, title, text) => {
        return MarkedRenderer.prototype.link.call(renderer, anchorService.normalizeExternalUrl(href), title, text);
    };

    renderer.heading = (text: string, level: number) => {
        if(text[0] === '<') return `<h${level}>${text}</h${level}>`;
        const escapedText = text.toLowerCase().replace(/[^\S]+/g, '-');
        return `<h${level} id="${escapedText}">${text}</h${level}>`;
    };
    
    renderer.table = (header: string, body: string) => {
        return `<div class="table">
                    <table>
                        ${header}
                        ${body}
                    </table>
                </div>`;
    };

    return { renderer };
}