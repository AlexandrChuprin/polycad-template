import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { SetOption } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-options-component',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent extends CommonComponent implements AfterViewChecked {

  title = 'Опции';
  comment = 'выберите необходимые опции';

  groupenMap = null;

  get options() {
    return SettingsPolycad.options;
  }

  get optionsGroupenKeys() {
    // console.log(`optionsGroupen`);
    if (this.groupenMap) {
      return Array.from(this.groupenMap.keys());
    } else {
      return [];
    }
  }
  getOptionsGroupenValue(key) {
    // console.log(`optionsGroupen`);
    return this.groupenMap.get(key);
  }

  ngOnInit() {
    super.ngOnInit();
    setTimeout(() => {
      const groups = [];

      SettingsPolycad.options
      .forEach(_ => {
        if (!groups.includes(_.description)) {
          groups.push(_.description);
        }
      });
  
      const groupenMap = new Map();
      for (let group of groups) {
        groupenMap.set(group, SettingsPolycad.options.filter(_ => _.description === group))
      }
  
      this.groupenMap = groupenMap;
    }, 100);
    
  }

  ngAfterViewChecked(): void {

    // console.log('ngAfterViewChecked');
  }

  setOption(idoption: string, checked: boolean) {
    console.log(`option: ${idoption}, checked: ${checked}`);
    if (!checked) {
      let o = this.options.find(_ => _.idoption === idoption);
      if (o && o.suboptions) {
        o.suboptions.forEach(so => this.setOption(so.idoption, false));
      }
    }
    if (checked) {
      let root = this.options.find(_ => _.suboptions && _.suboptions.find(so => so.idoption === idoption) != null);
      if (root) {
        this.setOption(root.idoption, true);
        root.suboptions.forEach(so => this.setOption(so.idoption, false));
      } else {
        let o = this.options.find(_ => _.idoption === idoption);
        if (o && o.suboptions) {
          // this.setOption(o.suboptions[0].idoption, true);
        }
      }
    }
    this.stateProvider.process(new SetOption(idoption, checked));
  }
  isChecked(idoption: string) {
    return this.state.simpleJSON.idoptions.indexOf(idoption) > -1;
  }

}
