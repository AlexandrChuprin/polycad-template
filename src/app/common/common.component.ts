import { Component, OnInit } from '@angular/core';
import { SetTitleAndComment } from '../actions/actions';
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
  constructor(public stateProvider: StateProviderService) { }

  ngOnInit() {
    this.stateProvider.process(new SetTitleAndComment(this.title, this.comment));
    this.stateProvider.state.subscribe((state: State) => {
      if (state) {
        this.state = state;
      }
    });
  }


}
