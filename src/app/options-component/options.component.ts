import { Component } from '@angular/core';
import { SetOption } from '../actions/actions';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-options-component',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent extends CommonComponent {
  title = 'Опции';
  comment = 'выберите необходимые опции';

  setOption(option: string, checked: boolean) {
    this.stateProvider.process(new SetOption(option, checked));
  }
  isChecked(option: string) {
    return this.state.simpleJSON.idoptions.indexOf(option) > -1;
  }
}
