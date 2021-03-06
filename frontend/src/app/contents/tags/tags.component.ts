import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/app.model';
import { TagsService } from 'src/app/shared/service/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Tag[];

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.tagsService.getTags()
      .subscribe((tags: Tag[]) => this.tags = tags);
  }

}
