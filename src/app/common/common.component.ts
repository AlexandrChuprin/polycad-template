import { Component, OnInit } from '@angular/core';
import { SetTitleAndComment } from '../actions/actions';
import { SettingsPolycad } from '../classes/settings/setings-polycad';
import { State } from '../classes/state';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
  title = '';
  comment = '';
  state: State;
  constrtypeMarking = '';
  
    
  constructor(public stateProvider: StateProviderService) {

  }

  ngOnInit() {
    
    this.stateProvider.process(new SetTitleAndComment(this.title, this.comment));
    
    this.stateProvider.state.subscribe((state: State) => {
      if (state) {
        this.state = state;
        const templateDefault = SettingsPolycad.templates.find(_ => _.id.replace('template-', '') === this.state.simpleJSON.idtemplate);
        if (templateDefault) {
          this.constrtypeMarking = templateDefault.marking;
        } else {
          this.constrtypeMarking = '';
        }
      }
    });
  }

  isPage(page: string) {
    return page === this.state.page;
  }
  goToPage(pageIdx: number) {
    const page = this.state.pages[pageIdx - 1];
    if (page) {
      this.stateProvider.updatePage(page);
    }
  }
}
