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
    description += getTemplateDescription(this.state.simpleJSON.template);
    if (this.state.simpleJSON.template > 3 && this.state.simpleJSON.template < 20) {
      description += `\nВысота: ${+this.state.simpleJSON.height_door > +this.state.simpleJSON.height
        ? +this.state.simpleJSON.height_door
        : +this.state.simpleJSON.height
        }`;
    } else if (this.state.simpleJSON.template < 3) {
      description += `\nВысота: ${+this.state.simpleJSON.height}`;
    } else if (this.state.simpleJSON.template >= 20) {
      description += `\nВысота: ${+this.state.simpleJSON.height_door}`;
    }
    if (this.state.simpleJSON.template > 3 && this.state.simpleJSON.template < 20) {
      description += `\nШирина: ${+this.state.simpleJSON.width + +this.state.simpleJSON.width_door}`;
    } else if (this.state.simpleJSON.template < 3) {
      description += `\nШирина: ${+this.state.simpleJSON.width}`;
    } else if (this.state.simpleJSON.template >= 20) {
      description += `\nШирина: ${+this.state.simpleJSON.width_door}`;
    }
    description += `\nЦвет внутренний: ${this.state.simpleJSON.color_in}`;
    description += `\nЦвет внешний: ${this.state.simpleJSON.color_out}`;
    description += `\nПрофильная система: ${this.state.simpleJSON.profile}`;
    description += `\nФурнитурная система: ${this.state.simpleJSON.furniture}`;
    description += `\nПакеты: ${this.state.simpleJSON.glass}`;
    if (this.state.simpleJSON.idoptions.length) {
      description += `\nОпции: ${this.state.simpleJSON.idoptions}`;
    }
    return description;
  }

  get constypeInfo() {
    let description = '';
    description += this.constrtypeMarking;
    if (this.state.simpleJSON.template > 3 && this.state.simpleJSON.template < 20) {
      description += `\nВысота: ${+this.state.simpleJSON.height_door > +this.state.simpleJSON.height
        ? +this.state.simpleJSON.height_door
        : +this.state.simpleJSON.height
        }`;
    } else if (this.state.simpleJSON.template < 3) {
      description += `\nВысота: ${+this.state.simpleJSON.height}`;
    } else if (this.state.simpleJSON.template >= 20) {
      description += `\nВысота: ${+this.state.simpleJSON.height_door}`;
    }
    if (this.state.simpleJSON.template > 3 && this.state.simpleJSON.template < 20) {
      description += `\nШирина: ${+this.state.simpleJSON.width + +this.state.simpleJSON.width_door}`;
    } else if (this.state.simpleJSON.template < 3) {
      description += `\nШирина: ${+this.state.simpleJSON.width}`;
    } else if (this.state.simpleJSON.template >= 20) {
      description += `\nШирина: ${+this.state.simpleJSON.width_door}`;
    }
    return description;
  }
  get optionsInfo() {
    const res = this.state.simpleJSON.idoptions
      .map(idoption => this.state.settings.options.find(_ => _.id === idoption).name)
      .join(' \/ ');
    return res;
  }
  get psInfo() {
    let s = '';
    if (this.state.simpleJSON.profile) {
      s += this.state.simpleJSON.profile;
    }
    const ps = SettingsPolycad.profileSystems.find(_ => _.marking === this.state.simpleJSON.profile);
    if (ps) {
      s += ' ' + ps.description;
    }
    return s == null ? '' : s;
  }
  get colorsInfo() {
    let s = '';
    const color_in = SettingsPolycad.colors.find(_ => _.id === this.state.simpleJSON.color_in);
    const color_out = SettingsPolycad.colors.find(_ => _.id === this.state.simpleJSON.color_out);
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
