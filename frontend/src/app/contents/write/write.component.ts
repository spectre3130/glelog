import { Component, OnInit, OnDestroy } from '@angular/core';
import { WriteStore } from './write.store';
import { Post } from 'src/app/app.model';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
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
