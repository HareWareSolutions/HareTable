import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage.component';
import { LandingpageRoutingModule } from './landingpage-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingpageComponent],
  imports: [
    CommonModule,
    FormsModule,
    LandingpageRoutingModule
  ]
})
export class LandingpageModule { }
