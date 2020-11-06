import { Component } from '@angular/core';
import { StateProviderService } from './state-provider.service';
import { delay, filter } from 'rxjs/operators';
import { SettingsPolycad } from './classes/settings/setings-polycad';
import { SelectTemplate } from './actions/actions';
import { State } from './classes/state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prodline-custom';
  state: State = null;
  actualRoute = '';
  constructor(private stateProvider: StateProviderService) {
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

  getStyle(route: string) {
    return {color: route === this.actualRoute ? 'black' : 'white'};
  }
}
