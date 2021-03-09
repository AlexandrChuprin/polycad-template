import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StateProviderService } from './state-provider.service';
import { delay, filter, map } from 'rxjs/operators';
import { SettingsPolycad } from './classes/settings/setings-polycad';
import { SelectTemplate } from './actions/actions';
import { State } from './classes/state';
import { fromEvent, Subscription } from 'rxjs';
import { KeyUpService } from './keyup-service';
import { ActivatedRoute, Params } from '@angular/router';
import { OknaspaceExchangeService } from './oknaspace-exchange.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'prodline-custom';
  state: State = null;
  actualRoute = '';
  subscriptionKeyPress: Subscription;
  
  get lang() {
    return this.state.settings.lang;
  }

  constructor(

    private stateProvider: StateProviderService,
    public keyUpService: KeyUpService,
    private ref: ChangeDetectorRef,
    private oknaspaceExchangeService: OknaspaceExchangeService
  ) {

    stateProvider.state
    .pipe(
      filter(_ => _ != null)
    )
    .subscribe(_ => {
      this.actualRoute = _.page;
      this.state = _;
    });
    SettingsPolycad.prepare();
    this.stateProvider.process(new SelectTemplate(1));
  }

  ngOnInit(): void {
    this.subscriptionKeyPress = fromEvent(document, 'keydown')
    .subscribe((e: KeyboardEvent) => {
      this.keyUpService.lastKey.next(e.key);
      this.update();
    });

    this.oknaspaceExchangeService.bindEvent(window, 'message', (e) => {
      console.log(`msg: ${e.data} from ${e.origin}`);
      if (e.origin && e.origin != null && e.origin !== 'null') {
        OknaspaceExchangeService.origin = e.origin;
      }
    });
  }
  
  ngOnDestroy() {

    if (this.subscriptionKeyPress) {
      this.subscriptionKeyPress.unsubscribe();
    }
    // if (this.subscriptionSpinner) {
    //   this.subscriptionSpinner.unsubscribe();
    // }
  }

  update() {
    setTimeout(() => this.ref.detectChanges(), 100);
  }

  getStyle(route: string) {
    return {color: route === this.actualRoute ? 'black' : 'white'};
  }
}
