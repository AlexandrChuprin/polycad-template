import { Component, OnInit } from '@angular/core';
import { SetColorIn, SetColorOut } from '../actions/actions';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-colors-component',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent extends CommonComponent {
  title = 'Цвета';
  comment = 'выберите цвет изделия';

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
