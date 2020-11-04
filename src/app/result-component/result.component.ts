import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { getTemplateDescription } from '../interfaces/simple-json';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends CommonComponent {
  title = 'Результат';
  comment = 'сформированное изделие';
  get modelDescription() {
    let description = '';
    description += getTemplateDescription(this.state.simpleJSON.template);
    description += `\nВысота: ${+this.state.simpleJSON.height_door > +this.state.simpleJSON.height
      ? +this.state.simpleJSON.height_door
      : +this.state.simpleJSON.height
    }`;
    description += `\nШирина: ${+this.state.simpleJSON.width + +this.state.simpleJSON.width_door}`;
    description += `\nЦвет внутренний: ${this.state.simpleJSON.color_in}`;
    description += `\nЦвет внешний: ${this.state.simpleJSON.color_out}`;
    description += `\nПрофильная система: ${this.state.simpleJSON.profile}`;
    description += `\nФурнитурная система: ${this.state.simpleJSON.furniture}`;
    description += `\nПакеты: ${this.state.simpleJSON.glass}`;
    description += `\nОпции: ${this.state.simpleJSON.idoptions}`;
    return description;
  }
}
