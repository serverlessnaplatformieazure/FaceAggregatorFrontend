import { Component, Input } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { environment as env } from '../../../../environments/environment'

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.less']
})
export class NavigationComponent {
  @Input()
  public routes: Route[];
  public prefix = env.production ? "/app" : "";
  constructor() {
  }
}
