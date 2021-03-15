import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SetCalced, SetCalcedSimpleJSON, SetIdorderdocitem } from '../actions/actions';
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
    let s = '';
    s += this.state.price;
    return s + ' грн';
  }

  get image() {
    
    let pic = '';

    if (this.state && this.state.calcedSimpleJSON && this.state.calcedSimpleJSON.pic) {
      pic = this.state.calcedSimpleJSON.pic;
    }

    if (!pic && this.state && this.state.simpleJSON && this.state.simpleJSON.pic) {
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
      .map(idoption => this.state.settings.options.find(_ => _.id === idoption).name)
      .join(' \/ ');
    return res;
  }

  get colorsInfo() {
    let s = '';
    const color_in = SettingsPolycad.colors.find(_ => _.id === this.state.simpleJSON.color_in);
    const color_out = SettingsPolycad.colors.find(_ => _.id === this.state.simpleJSON.color_out);
    s += `${color_in ? color_in.marking : ''} / ${color_out ? color_out.marking : ''}`;
    return s;
  }

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public stateProvider: StateProviderService,
    private sanitizer: DomSanitizer
  ) {
    super(stateProvider);
    // this.router.events.subscribe(_ => {
    //   if (_ instanceof NavigationEnd) {
    //     this.stateProvider.updatePage(_.url.substring(1));
    //   }
    // });
    this.route.params
      .subscribe((params: Params) => {
        console.log(`params: `);
        console.log(params);
        if (params && params.token) {
          this.stateProvider.loadPolycadSettings(params.token);
        } else {
          console.log('Не передан токен!');
          if (this.state) {
            this.state.error = 'Не передан токен!';
            // this.stateProvider.setState(this.state);
          }
        }
      });
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
    this.calcMobile();
  }

  calcMobile() {
    if (this.state && this.state.canCalc) {
      console.log('считаем');
      const next = this.state.pages[this.state.pages.length - 1];
      if (next) {
        this.stateProvider.updatePage(next);
      }
      // this.stateProvider.process(new SetIdorderdocitem(0));
      this.stateProvider.addOrderdocitemsObservable()
      .pipe(switchMap((idorderitems: number[]) => {
        console.log(`idorderitems: `);
        console.log(idorderitems);
        this.stateProvider.process(new SetCalced(false));
        this.stateProvider.process(new SetCalcedSimpleJSON(JSON.parse(JSON.stringify(this.state.simpleJSON))));
        this.stateProvider.process(new SetIdorderdocitem(idorderitems[0]));
        this.stateProvider.checkOrderCalced();
        return of(true);
      })
      ).subscribe();
    }
  }

}
