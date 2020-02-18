import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/app.model';

@Component({
  selector: 'app-user-home-tags',
  templateUrl: './user-home-tags.component.html',
  styleUrls: ['./user-home-tags.component.css']
})
export class UserHomeTagsComponent implements OnInit {

  @Input() username: string;
  @Input() tags: Array<Tag>;
  @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  onClickTag(event, name): void {
    document.documentElement.scrollTop = 0;
    this.onSelected.emit(name);
  }


}
