import { Polycad } from '@a.chuprin/polycad-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SetCalculationStatus } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { CommonComponent } from '../common/common.component';
import { getTemplateDescription } from '../interfaces/simple-json';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends CommonComponent implements OnInit {
  title = 'Итог';
  comment = 'сформированное изделие';

  get summ() {
    let s = '';
    s += this.state.price;
    return s + ' грн';
  }

  get modelDescription() {
    let description = '';
    description += getTemplateDescription(this.state.calcedSimpleJSON.template);
    if (this.state.calcedSimpleJSON.template > 3 && this.state.calcedSimpleJSON.template < 20) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height_door > +this.state.calcedSimpleJSON.height
        ? +this.state.calcedSimpleJSON.height_door
        : +this.state.calcedSimpleJSON.height
        }`;
    } else if (this.state.calcedSimpleJSON.template < 3) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height}`;
    } else if (this.state.calcedSimpleJSON.template >= 20) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height_door}`;
    }
    if (this.state.calcedSimpleJSON.template > 3 && this.state.calcedSimpleJSON.template < 20) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width + +this.state.calcedSimpleJSON.width_door}`;
    } else if (this.state.calcedSimpleJSON.template < 3) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width}`;
    } else if (this.state.calcedSimpleJSON.template >= 20) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width_door}`;
    }
    description += `\nЦвет внутренний: ${this.state.calcedSimpleJSON.color_in}`;
    description += `\nЦвет внешний: ${this.state.calcedSimpleJSON.color_out}`;
    description += `\nПрофильная система: ${this.state.calcedSimpleJSON.profile}`;
    description += `\nФурнитурная система: ${this.state.calcedSimpleJSON.furniture}`;
    description += `\nПакеты: ${this.state.calcedSimpleJSON.glass}`;
    if (this.state.calcedSimpleJSON.idoptions.length) {
      description += `\nОпции: ${this.state.calcedSimpleJSON.idoptions}`;
    }
    return description;
  }

  get constypeInfo() {
    let description = '';
    description += this.constrtypeMarking;
    if (this.state.calcedSimpleJSON.template > 3 && this.state.calcedSimpleJSON.template < 20) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height_door > +this.state.calcedSimpleJSON.height
        ? +this.state.calcedSimpleJSON.height_door
        : +this.state.calcedSimpleJSON.height
        }`;
    } else if (this.state.calcedSimpleJSON.template < 3) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height}`;
    } else if (this.state.calcedSimpleJSON.template >= 20) {
      description += `\nВысота: ${+this.state.calcedSimpleJSON.height_door}`;
    }
    if (this.state.calcedSimpleJSON.template > 3 && this.state.calcedSimpleJSON.template < 20) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width + +this.state.calcedSimpleJSON.width_door}`;
    } else if (this.state.calcedSimpleJSON.template < 3) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width}`;
    } else if (this.state.calcedSimpleJSON.template >= 20) {
      description += `\nШирина: ${+this.state.calcedSimpleJSON.width_door}`;
    }
    return description;
  }
  get optionsInfo() {
    const res = this.state.calcedSimpleJSON.idoptions
      .map(idoption => this.state.settings.options.find(_ => _.id === idoption).name)
      .join(' \/ ');
    return res;
  }
  get psInfo() {
    let s = '';
    if (this.state.calcedSimpleJSON.profile) {
      s += this.state.calcedSimpleJSON.profile;
    }
    const ps = SettingsPolycad.profileSystems.find(_ => _.marking === this.state.calcedSimpleJSON.profile);
    if (ps) {
      s += ' ' + ps.description;
    }
    return s == null ? '' : s;
  }
  get colorsInfo() {
    let s = '';
    const color_in = SettingsPolycad.colors.find(_ => _.id === this.state.calcedSimpleJSON.color_in);
    const color_out = SettingsPolycad.colors.find(_ => _.id === this.state.calcedSimpleJSON.color_out);
    s += `${color_in ? color_in.marking : ''} / ${color_out ? color_out.marking : ''}`;
    return s;
  }

  constructor(public stateProvider: StateProviderService, private sanitizer: DomSanitizer) {
    super(stateProvider);
  }

  ngOnInit() {
    super.ngOnInit();
    
    const timer = setInterval(() => {
      if (this.state.calced) {
        clearInterval(timer);
        this.stateProvider.process(new SetCalculationStatus(false));
        setTimeout(() => {
          window.scrollTo(0,document.body.scrollHeight);
        }, 1000);
      } else {
        this.stateProvider.process(new SetCalculationStatus(true));
      }
    }, 500);
  }

}
