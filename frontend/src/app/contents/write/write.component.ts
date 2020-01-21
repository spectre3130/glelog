import { Component, OnInit, OnDestroy } from '@angular/core';
import * as marked from 'marked';
import { WriteService } from 'src/app/contents/write/write.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, OnDestroy{

  compiledMarkdown: string;
  startingValue = '';

  constructor(
    private writeService: WriteService
  ) {
  }

  ngOnInit() {
    this.writeService.changeWriteMode(true);
    this.startingValue = this.getPlaceHolder();
    this.compiledMarkdown = this.compileMarkdown(this.startingValue);
  }

  ngOnDestroy() {
    this.writeService.changeWriteMode(false);
  }

  onBodyChanged(value: string) {
    this.compiledMarkdown = this.compileMarkdown(value);
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }

  private getPlaceHolder() {
    return (
      '# Title \n' +
      '## Title\n' +
      '### Title\n' +
      '#### Title\n\n' +

      '**bold**\n\n' +

      '*italic*\n\n' +

      'inline `code`\n\n' +

      '### code block\n' +
      '```javascript\n' +
      'const foo = () => {\n' +
      '    return 1\n' +
      '}\n' +
      '```\n\n' +

      '### unorderd list\n' +
      '- item 1\n' +
      '* item 2\n\n' +

      '### orderd list\n\n' +
      '1. item a\n' +
      '2. item b'
    );
  }



}
