import { State } from '../classes/state';

export class StoreAction {
    perform(lastState: State): State {
        const state = new State();
        state.title = lastState.title;
        state.comment = lastState.comment;
        state.page = lastState.page;
        state.pages = lastState.pages;

        state.simpleJSON = lastState.simpleJSON;
        state.calcedSimpleJSON = lastState.calcedSimpleJSON;

        state.mobile = lastState.mobile;
        state.calced = lastState.calced;
        state.changed = lastState.changed;
        state.price = lastState.price;
        state.qu = lastState.qu;

        state.idorderdocitem = lastState.idorderdocitem;
        state.idorderdoc = lastState.idorderdoc;
        state.settingsLoaded = lastState.settingsLoaded;
        state.error = lastState.error;
        state.info = lastState.info;
        state.settings = lastState.settings;
        state.isCalculationInProgress = lastState.isCalculationInProgress;
        
        return state;
    }
}
