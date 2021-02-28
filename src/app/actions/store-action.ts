import { State } from '../classes/state';

export class StoreAction {
    perform(stateNew: State): State {
        const state = new State();
        state.comment = stateNew.comment;
        state.page = stateNew.page;
        state.pages = stateNew.pages;
        state.simpleJSON = stateNew.simpleJSON;
        state.title = stateNew.title;
        state.isCalculationInProgress = stateNew.isCalculationInProgress;
        return state;
    }
}
