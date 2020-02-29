import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[authenticated]'
})
export class AuthenticatedDirective implements OnInit, OnDestroy {

  @Input() authenticated: boolean;
  isAuthenticated: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated.subscribe(
      isAuthenticated => this.initView(isAuthenticated)
    )
  }

  ngOnDestroy(): void {
    this.isAuthenticated.unsubscribe();
  }

  initView(isAuthed: boolean): void {
    if (isAuthed && this.authenticated || !isAuthed && !this.authenticated) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }



}
