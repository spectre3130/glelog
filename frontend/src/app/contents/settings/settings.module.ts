import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsAvatarComponent } from './settings-avatar/settings-avatar.component';
import { SettingsBaseBtnComponent } from './settings-base-btn/settings-base-btn.component';
import { SettingsInputComponent } from './settings-input/settings-input.component';
import { SettingsSocialInputComponent } from './settings-social-input/settings-social-input.component';
import { SettingsUsernameInputComponent } from './settings-username-input/settings-username-input.component';
import { SettingsResolverService } from './settings-resolver.service';


@NgModule({
  declarations: [
    SettingsComponent,
    SettingsBaseBtnComponent,
    SettingsAvatarComponent,
    SettingsInputComponent,
    SettingsSocialInputComponent,
    SettingsUsernameInputComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ],
  providers: [
    SettingsResolverService
  ]
})
export class SettingsModule { }
