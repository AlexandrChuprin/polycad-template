// import { Polycad } from '@a.chuprin/polycad-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonComponent } from '../common/common.component';
import { getTemplateDescription } from '../interfaces/simple-json';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends CommonComponent {
  title = 'Результат';
  comment = 'сформированное изделие';

  @ViewChild('containerSVG', { static: true }) containerSVG;
  @ViewChild('containerSVGTemp', { static: true }) containerSVGTemp;

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

  constructor(public stateProvider: StateProviderService, private sanitizer: DomSanitizer) {
    super(stateProvider);
  }

  get image() {
    return '';
    // if (this.state && this.state.polycad && this.state.polycad.model
    //   && this.state.polycad.model.template && this.state.polycad.model.template.installOptions) {
    //   // console.log(this.state.polycad.model.template);
    //   this.state.polycad.controller.last_template = +this.state.simpleJSON.template;
    //   const pic = this.state.polycad.getBase64Svg({ show_back: 0, draw_sizes: 1 });
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(pic);
    // } else {
    //   return '';
    // }
  }
}
