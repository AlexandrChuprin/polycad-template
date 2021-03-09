import { Component, OnInit } from '@angular/core';
import { SetFurniture, SetProfile } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-systems-component',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent extends CommonComponent {
  title = 'Профильная система';
  comment = 'выберите профильную систему';

  get profileSystems() {
    return SettingsPolycad.profileSystems;
  }

  setProfile(option: string) {
    this.stateProvider.process(new SetProfile(option));
    this.stateProvider.process(new SetFurniture(SettingsPolycad.furnitureSystems[0].marking));
  }
  isChecked(profile: string) {
    return this.state.simpleJSON.profile === profile;
  }
}
