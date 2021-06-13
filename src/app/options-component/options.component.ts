import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
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

  isInited = false;
  groupenMap = null;

  optionsToCheck = [];
  optionsCommon = [];
  optionsWithSuboptions = [];

  get optionsToCheck_() {
    return this.optionsToCheck.filter(_ => !_.disabledProducts || !_.disabledProducts.includes(this.state.simpleJSON.idproduct));
  }

  get optionsCommon_() {
    return this.optionsCommon.filter(_ => !_.disabledProducts || !_.disabledProducts.includes(this.state.simpleJSON.idproduct));
  }

  get optionsWithSuboptions_() {
    return this.optionsWithSuboptions.filter(_ => !_.disabledProducts || !_.disabledProducts.includes(this.state.simpleJSON.idproduct));
  }

  get options() {
    const filtered = SettingsPolycad.options.filter(_ => (_.isActive || isUndefined(_.isActive)));
    const sorted = filtered.sort((a, b) => a.numpos - b.numpos);
    return sorted.slice();
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
    // setTimeout(() => {
    //   const groups = [];

    //   this.options
    //   .forEach(_ => {
    //     if (!groups.includes(_.description)) {
    //       groups.push(_.description);
    //     }
    //   });
  
    //   const groupenMap = new Map();
    //   for (let group of groups) {
    //     groupenMap.set(group, SettingsPolycad.options.filter(_ => _.description === group))
    //   }
  
    //   this.groupenMap = groupenMap;

    //   this.options.forEach(_ => this.setOption(_.idoption, _.checked));
    // }, 100);

    this.options.forEach(o => {
      if (o.suboptions.length && o.isCommon) {
        this.optionsWithSuboptions.push(o);
      } else if (o.isCommon) {
        this.optionsCommon.push(o);
      } else {
        this.optionsToCheck.push(o);
      }
    });
    this.optionsCommon.forEach(_ => this.setOption(_.idoption, _.checked));
    this.optionsWithSuboptions.forEach(_ => {
      this.setOption(_.idoption, _.checked);
      if (_.suboptions && _.suboptions.length && _.suboptions.find(so => so.checked) != null) {
        _.suboptions.forEach(so => this.setOption(so.idoption, so.checked));
      } else if (_.suboptions && _.suboptions.length) {
        this.setOption(_.suboptions[0].idoption, true);
      }
    });

    this.optionsWithSuboptions.sort((a, b) => a.numpos - b.numpos);
    this.optionsWithSuboptions.forEach(o => {
      if (o.suboptions) {
        o.suboptions.sort((a, b) => a.numpos - b.numpos);
      }
    });

    this.optionsCommon.sort((a, b) => a.numpos - b.numpos);
    this.optionsCommon.forEach(o => {
      if (o.suboptions) {
        o.suboptions.sort((a, b) => a.numpos - b.numpos);
      }
    });

    this.optionsToCheck.sort((a, b) => a.numpos - b.numpos);
    this.optionsToCheck.forEach(o => {
      if (o.suboptions) {
        o.suboptions.sort((a, b) => a.numpos - b.numpos);
      }
    });

    this.isInited = true;
  }

  ngAfterViewChecked(): void {

    // console.log('ngAfterViewChecked');
  }

  setOption(idoption: string, checked: boolean) {
    // console.log(`option: ${idoption}, checked: ${checked}`);

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

  getOptionNameStyle(idoption: string) {
    const option = this.options.find(_ => _.idoption === idoption);
    if (option && option.disabledOpenTypes) {
      const openTypes = this.state.simpleJSON.fields.map(_ => _.open_type);
      openTypes.push(...this.state.simpleJSON.fields_door.map(_ => _.open_type));
      const isOptionAvalibleWithThisOpenTypes = openTypes.filter(_ => !option.disabledOpenTypes.includes(_)).length > 0;
      if (!isOptionAvalibleWithThisOpenTypes) {
        return {'text-decoration': 'line-through'}
      }
    }
    return {};
  }

}
