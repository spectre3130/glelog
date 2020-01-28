import { Component, OnInit, OnDestroy } from '@angular/core';
import { WriteService } from 'src/app/contents/write/write.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, OnDestroy{

  animal: string;
  name: string;

  constructor(
    private writeService: WriteService
  ) {
  }

  ngOnInit() {
    this.writeService.changeWriteMode(true);
  }

  ngOnDestroy() {
    this.writeService.changeWriteMode(false);
  }
}
