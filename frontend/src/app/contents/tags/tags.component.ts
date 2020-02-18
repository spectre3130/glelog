import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<Tag> = [];
  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.tagsService.getTags()
    .subscribe((tags: Array<Tag>) => this.tags = tags);
  }

}
