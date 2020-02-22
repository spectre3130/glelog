import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/app.model';
import { WriteStore } from 'src/app/shared/service/write.store';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit, OnDestroy{

  post: Post;
  
  constructor(
    private writeStore: WriteStore
  ) {
  }

  ngOnInit(): void {
    this.post = this.writeStore.getPost();
    this.writeStore.changeWriteMode(true);
  }

  ngOnDestroy(): void {
    this.writeStore.changeWriteMode(false);
    this.writeStore.clear();
  }
}
