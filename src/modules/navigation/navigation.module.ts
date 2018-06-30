import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, RouterModule, BrowserAnimationsModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule { }
