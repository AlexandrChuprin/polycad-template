import { Component } from '@angular/core';
import { StateProviderService } from './state-provider.service';
import { filter } from 'rxjs/operators';
import { SettingsPolycad } from './classes/settings/setings-polycad';
import { SelectTemplate } from './actions/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prodline-custom';

  actualRoute = '';
  constructor(private stateProvider: StateProviderService) {
    stateProvider.state
    .pipe(
      filter(_ => _ != null)
    )
    .subscribe(_ => {
      this.actualRoute = _.page;
    });
    SettingsPolycad.prepare();
    this.stateProvider.process(new SelectTemplate(1));
  }

  getStyle(route: string) {
    return {color: route === this.actualRoute ? 'black' : 'white'};
  }
}
