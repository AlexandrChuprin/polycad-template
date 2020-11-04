import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreAction } from './actions/store-action';
import { State } from './classes/state';

@Injectable({
  providedIn: 'root'
})
export class StateProviderService {

  state: BehaviorSubject<State> = new BehaviorSubject(null);
  lastState: State = new State();
  constructor() { }

  next(state: State) {
    this.lastState = JSON.parse(JSON.stringify(state));
    this.state.next(state);
  }

  updatePage(page: string) {
    this.lastState.page = page;
    this.next(this.lastState);
  }

  process(action: StoreAction) {
    this.next(action.perform(this.lastState));
  }
}
