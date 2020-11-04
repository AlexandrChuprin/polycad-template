import { State } from '../classes/state';

export class StoreAction {
    perform(state: State): State {
        const updatedState = new State();
        updatedState.comment = state.comment;
        updatedState.page = state.page;
        updatedState.pages = state.pages;
        updatedState.simpleJSON = state.simpleJSON;
        updatedState.title = state.title;
        return updatedState;
    }
}
