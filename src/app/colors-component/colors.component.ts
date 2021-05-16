import { Component, OnInit } from '@angular/core';
import { SetColorIn, SetColorOut } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-colors-component',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent extends CommonComponent {
  title = 'Цвета';
  comment = 'выберите цвет изделия';
  get colors() {
    return SettingsPolycad.colors;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.colors.length) {
      const color = this.colors[0].id;
      this.stateProvider.process(new SetColorIn(color));
      this.stateProvider.process(new SetColorOut(color));
    }
  }

  setColorOut(color: string) {
    this.stateProvider.process(new SetColorOut(color));
  }
  setColorIn(color: string) {
    this.stateProvider.process(new SetColorIn(color));
  }
  isColorOutChecked(color: string) {
    return this.state.simpleJSON.color_out === color;
  }
  isColorInChecked(color: string) {
    return this.state.simpleJSON.color_in === color;
  }

}
