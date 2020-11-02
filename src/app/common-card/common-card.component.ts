import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { State } from '../classes/state';
import { CommonComponent } from '../common/common.component';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent extends CommonComponent {



  constructor(public router: Router, public stateProvider: StateProviderService) {
    super(stateProvider);
    this.router.events.subscribe(_ => {
      if (_ instanceof NavigationEnd) {
        this.stateProvider.updatePage(_.url.substring(1));
      }
    });
  }

  prev() {
    const prev = this.state.pages[(this.state.pages.indexOf(this.state.page) - 1) % this.state.pages.length];
    if (prev) {
      this.router.navigateByUrl(prev);
    }
  }
  next() {
    const next = this.state.pages[(this.state.pages.indexOf(this.state.page) + 1) % this.state.pages.length];
    if (next) {
      this.router.navigateByUrl(next);
    }
  }

}
