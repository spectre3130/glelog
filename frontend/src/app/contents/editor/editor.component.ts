import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WriteStore } from '../write/write.store';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  title: string = '';
  body: string = '';
  placeHolder: string;
  visible: boolean = true;
  changePostEvent: Subscription;
  
  constructor(
    private writeStore: WriteStore) { }

  ngOnInit() {
    this.placeHolder = this.getPlaceHolder();
    this.changePostEvent = this.writeStore.chagePostEvent
    .subscribe(post => {
      this.title = post.title;
      this.body = post.body;
    })
  }

  ngOnDestroy() {
    this.changePostEvent.unsubscribe();
    this.writeStore.clear();
  }

  onTitleChange(e): void {
    const title: string = e.target.value;
    this.title = title;
    this.writeStore.setTitle(title);
  }

  onBodyChange(e): void {
    const body = e.target.value 
    if(body) this.body = body;
    else this.body = '';
    this.writeStore.setBody(body);
  }
  
  private getPlaceHolder(): string {
    return '본문';
  }
}
