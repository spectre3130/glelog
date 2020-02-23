import { Component, OnInit } from '@angular/core';
import { TabsItem } from 'src/app/app.model';

@Component({
  selector: 'app-my-writing',
  templateUrl: './my-writing.component.html',
  styleUrls: ['./my-writing.component.scss']
})
export class MyWritingComponent implements OnInit {

  tabsItems: TabsItem[] = [
    { path: 'tempsave', name: '임시저장' },
    { path: 'public', name: '공개' },
    { path: 'private', name: '비공개' },
  ];
  activeLink: string;

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(component): void {
    this.activeLink = component.path;
  }

}
