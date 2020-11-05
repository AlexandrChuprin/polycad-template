import { Component } from '@angular/core';
import { SetDoorHeight, SetDoorWidth, SetWindowFills, SetWindowHeight, SetWindowWidth, SetDoorFills, SetWindowImpPositions, SetDoorImpPositions } from '../actions/actions';
import { CommonComponent } from '../common/common.component';
import { getOpenTypeDescription, getTemplateDescription, OpenType } from '../interfaces/simple-json';

@Component({
  selector: 'app-params-component',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent extends CommonComponent {
  title = 'Параметры';
  comment = 'укажите параметры изделия';
  get modelDescription() {
    let description = '';
    description += getTemplateDescription(this.state.simpleJSON.template);
    return description;
  }
  openTypeDescription(opentype: OpenType) {
    return getOpenTypeDescription(opentype);
  }

  setWindowImpPos(idx: number, pos: number) {
    const impPos = [...this.state.simpleJSON.imposts];
    impPos[+idx] = +pos;
    this.stateProvider.process(new SetWindowImpPositions(impPos));
  }
  setDoorImpPos(idx: number, pos: number) {
    const impPos = [...this.state.simpleJSON.imposts_door];
    impPos[+idx] = +pos;
    this.stateProvider.process(new SetDoorImpPositions(impPos));
  }

  setWindowHeight(value: number) {
    console.log('setWindowHeight');
    console.log(value);
    this.stateProvider.process(new SetWindowHeight(+value));
  }
  setWindowWidth(value: number) {
    console.log('setWindowWidth');
    console.log(value);
    this.stateProvider.process(new SetWindowWidth(+value));
  }
  setOpenTypeWindow(fillIdx: number, value: OpenType) {
    console.log('setOpenTypeWindow_' + fillIdx);
    console.log(value);
    const fills = this.state.simpleJSON.fields;
    fills[fillIdx].open_type = value;
    this.stateProvider.process(new SetWindowFills(fills));
  }

  setDoorHeight(value: number) {
    console.log('setDoorHeight');
    console.log(value);
    this.stateProvider.process(new SetDoorHeight(+value));
  }
  setDoorWidth(value: number) {
    console.log('setDoorWidth');
    console.log(value);
    this.stateProvider.process(new SetDoorWidth(+value));
  }
  setOpenTypeDoor(value: OpenType) {
    console.log('setOpenTypeDoor');
    console.log(value);
    const fills = this.state.simpleJSON.fields_door;
    fills[0].open_type = value;
    this.stateProvider.process(new SetDoorFills(fills));
  }
}
