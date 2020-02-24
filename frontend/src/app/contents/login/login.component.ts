import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faBookOpen = faBookOpen;
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  faGithub = faGithub;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>, 
  ) { }

  ngOnInit(): void {
  }

  login(provider): void {
    window.location.replace(`${environment.resource}/auth/${provider}`);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
