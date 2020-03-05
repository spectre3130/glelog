import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationNode } from 'src/app/app.model';

@Component({
  selector: 'app-my-writing',
  templateUrl: './my-writing.component.html',
  styleUrls: ['./my-writing.component.scss'],
})
export class MyWritingComponent implements OnInit {

  nodes: NavigationNode[] = [
    { name: '임시저장', action: 'tempsave' },
    { name: '공개', action: 'public' },
    { name: '비공개', action: 'private' },
  ];

  activeLink: string;

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(component): void {
    this.activeLink = component.path;
  }



}
