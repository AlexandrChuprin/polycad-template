import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { State } from '../classes/state';
import { CommonComponent } from '../common/common.component';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent extends CommonComponent {

  get lang() {
    return this.state.settings.lang;
  }
  
  get summ() {
    return '5087.00 грн';
  }

  get image() {
    let pic = '';
    if (this.state && this.state.simpleJSON && this.state.simpleJSON.pic) {
      pic = this.state.simpleJSON.pic;
    }
    return this.sanitizer.bypassSecurityTrustUrl(pic);
  }

  get showPrevCalcButton() {
    let show = false;
    if (this.state && this.state.page && this.state.page == 'result') {
      show = true;
    }
    return show;
  }

  get showPrevButton() {
    let show = false;
    if (this.state && this.state.page && this.state.page !== 'constrtype' && this.state.page !== 'result') {
      show = true;
    }
    return show;
  }

  get showNextButton() {
    let show = false;
    if (this.state && this.state.page && this.state.page !== 'systems' && this.state.page !== 'result') {
      show = true;
    }
    return show;
  }

  get options() { 
    const res = this.state.simpleJSON.idoptions
      .map(idoption => this.optionsStatic.find(_ => _.idoption === idoption).name)
      .join(' \/ ');
    return res;
  }

  constructor(public router: Router, public stateProvider: StateProviderService, private sanitizer: DomSanitizer) {
    super(stateProvider);
    // this.router.events.subscribe(_ => {
    //   if (_ instanceof NavigationEnd) {
    //     this.stateProvider.updatePage(_.url.substring(1));
    //   }
    // });

  }

  prevCalc() {
    const prev = this.state.pages[0];
    if (prev) {
      // this.router.navigateByUrl(prev);
      this.stateProvider.updatePage(prev);
    }
  }

  prev() {
    const prev = this.state.pages[(this.state.pages.indexOf(this.state.page) - 1) % this.state.pages.length];
    if (prev) {
      // this.router.navigateByUrl(prev);
      this.stateProvider.updatePage(prev);
    }
  }
  next() {
    const next = this.state.pages[(this.state.pages.indexOf(this.state.page) + 1) % this.state.pages.length];
    if (next) {
      // this.router.navigateByUrl(next);
      this.stateProvider.updatePage(next);
    }
  }

  calc() {
    if (this.state.page === 'systems') {
      console.log('считаем');
      const next = this.state.pages[(this.state.pages.indexOf(this.state.page) + 1) % this.state.pages.length];
      if (next) {
        // this.router.navigateByUrl(next);
        this.stateProvider.updatePage(next);
      }
    } else {
      console.log('nope');
    }
  }

  calcMobile() {
      console.log('считаем');
      const next = this.state.pages[this.state.pages.length - 1];
      if (next) {
        this.stateProvider.updatePage(next);
      }
  }

}
