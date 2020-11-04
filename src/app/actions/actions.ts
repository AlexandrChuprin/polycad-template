import { State } from '../classes/state';
import { SimpleJSONFill, Template } from '../interfaces/simple-json';
import { StoreAction } from './store-action';

export class SelectTemplate extends StoreAction {
    constructor(private template: Template) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.template = this.template;
        return stateUpdated;
    }
}

export class SetTitleAndComment extends StoreAction {
    constructor(private title: string, private comment: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.title = this.title;
        stateUpdated.comment = this.comment;
        return stateUpdated;
    }
}


export class SetWindowWidth extends StoreAction {
    constructor(private width: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.width = this.width;
        return stateUpdated;
    }
}
export class SetWindowHeight extends StoreAction {
    constructor(private height: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.height = this.height;
        return stateUpdated;
    }
}
export class SetWindowImpPositions extends StoreAction {
    constructor(private impPositions: number[]) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.imposts = [...this.impPositions];
        return stateUpdated;
    }
}
export class SetWindowFills extends StoreAction {
    constructor(private fills: SimpleJSONFill[]) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.fields = [...this.fills];
        return stateUpdated;
    }
}


export class SetDoorWidth extends StoreAction {
    constructor(private width: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.width_door = this.width;
        return stateUpdated;
    }
}
export class SetDoorHeight extends StoreAction {
    constructor(private height: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.height_door = this.height;
        return stateUpdated;
    }
}
export class SetDoorImpPositions extends StoreAction {
    constructor(private impPositions: number[]) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.imposts_door = [...this.impPositions];
        return stateUpdated;
    }
}
export class SetDoorFills extends StoreAction {
    constructor(private fills: SimpleJSONFill[]) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.fields_door = [...this.fills];
        return stateUpdated;
    }
}


export class SetProfile extends StoreAction {
    constructor(private profile: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.profile = this.profile;
        return stateUpdated;
    }
}
export class SetFurniture extends StoreAction {
    constructor(private furniture: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.furniture = this.furniture;
        return stateUpdated;
    }
}
export class SetGlass extends StoreAction {
    constructor(private glass: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.glass = this.glass;
        return stateUpdated;
    }
}

export class SetColorIn extends StoreAction {
    constructor(private colorIn: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.color_in = this.colorIn;
        return stateUpdated;
    }
}
export class SetColorOut extends StoreAction {
    constructor(private colorOut: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.simpleJSON.color_out = this.colorOut;
        return stateUpdated;
    }
}


export class SetOption extends StoreAction {
    constructor(private option: string, private checked: boolean) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        const idx = stateUpdated.simpleJSON.idoptions.indexOf(this.option);
        if (idx > -1) {
            if (!this.checked) {
                stateUpdated.simpleJSON.idoptions.splice(idx, 1);
            }
        } else {
            if (this.checked) {
                stateUpdated.simpleJSON.idoptions.push(this.option);
            }
        }
        return stateUpdated;
    }
}
