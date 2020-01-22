import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { WriteService } from 'src/app/contents/write/write.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faBookOpen = faBookOpen;
  faGithub = faGithub;
  isWriteMode:boolean;

  constructor(private writeService: WriteService) { }

  ngOnInit() {
    this.writeService.writeEvent
    .subscribe(val => this.isWriteMode = val);
  }

}
