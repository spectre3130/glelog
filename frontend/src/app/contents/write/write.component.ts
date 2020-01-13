import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import * as marked from 'marked';
import { NavbarService } from 'src/app/layout/navbar/navbar.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, OnDestroy{

  compiledMarkdown: string;
  startingValue = '';

  constructor(
    private navbarService: NavbarService
  ) {
  }

  ngOnInit() {
    this.navbarService.changeWriteMode(true);
    this.startingValue = this.getPlaceHolder();
    this.compiledMarkdown = this.compileMarkdown(this.startingValue);
  }

  ngOnDestroy() {
    this.navbarService.changeWriteMode(false);
  }

  onValueChanged(value: string) {
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
      '```\n' +
      `const foo = () => {
        return 1;
      }\n` +

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
