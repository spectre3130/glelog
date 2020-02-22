import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WriteStore } from 'src/app/shared/service/write.store';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() body: string;
  changePostEvent: Subscription;
  codeMirrorOptions = {
    theme: '3024-day',
    mode: 'markdown',
    lineWrapping: true,
    placeholder: '본문'
  };
  
  constructor(
    private writeStore: WriteStore
  ) { }

  ngOnInit(): void {
    this.changePostEvent = this.writeStore.chagePostEvent
    .subscribe(post => {
      this.title = post.title;
      this.body = post.body;
    });
  }

  ngOnDestroy(): void {
    this.changePostEvent.unsubscribe();
  }

  onTitleChange(e): void {
    const title: string = e.target.value;
    this.title = title;
    this.writeStore.setTitle(title);
  }

  onBodyChange(body: string): void {
    if(body) this.body = body;
    else this.body = '';
    this.writeStore.setBody(body);
  }
}
