import { Component, OnInit } from '@angular/core';
import { State } from '../classes/state';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  state: State;
  constructor(public stateProvider: StateProviderService) { }

  ngOnInit() {
    this.stateProvider.state.subscribe((state: State) => {
      if (state) {
        this.state = state;
      }
    });
  }


}
