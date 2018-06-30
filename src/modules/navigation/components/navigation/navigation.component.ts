import { Component, Input } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.less']
})
export class NavigationComponent {
  @Input()
  public routes: Route[];
  constructor() {
  }
}
