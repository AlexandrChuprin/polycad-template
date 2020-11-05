import { Component, OnInit } from '@angular/core';
import { SetProfile } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-systems-component',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent extends CommonComponent {
  title = 'Системы';
  comment = 'выберите профильную систему';

  get profileSystems() {
    return SettingsPolycad.profileSystems;
  }

  setProfile(option: string) {
    this.stateProvider.process(new SetProfile(option));
  }
  isChecked(profile: string) {
    return this.state.simpleJSON.profile === profile;
  }
}
