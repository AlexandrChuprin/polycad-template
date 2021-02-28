import { PolycadValut } from '../classes/settings/settings';
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
        stateUpdated.simpleJSON.idtemplate = this.template.toString();
        if (this.template === 1) {
            stateUpdated.simpleJSON.width = 600;
            stateUpdated.simpleJSON.height = 800;
            stateUpdated.simpleJSON.imposts = [];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 0;
            stateUpdated.simpleJSON.height_door = 0;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [];
        } else if (this.template === 2) {
            stateUpdated.simpleJSON.width = 1000;
            stateUpdated.simpleJSON.height = 800;
            stateUpdated.simpleJSON.imposts = [500];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 0;
            stateUpdated.simpleJSON.height_door = 0;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [];
        } else if (this.template === 3) {
            stateUpdated.simpleJSON.width = 1500;
            stateUpdated.simpleJSON.height = 800;
            stateUpdated.simpleJSON.imposts = [500, 1000];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 0;
            stateUpdated.simpleJSON.height_door = 0;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [];
        } else if (this.template === 4) {
            stateUpdated.simpleJSON.width = 700;
            stateUpdated.simpleJSON.height = 1200;
            stateUpdated.simpleJSON.imposts = [];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 600;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 6) {
            stateUpdated.simpleJSON.width = 700;
            stateUpdated.simpleJSON.height = 1200;
            stateUpdated.simpleJSON.imposts = [];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 600;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 5) {
            stateUpdated.simpleJSON.width = 1000;
            stateUpdated.simpleJSON.height = 1200;
            stateUpdated.simpleJSON.imposts = [500];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 600;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 7) {
            stateUpdated.simpleJSON.width = 1000;
            stateUpdated.simpleJSON.height = 1200;
            stateUpdated.simpleJSON.imposts = [500];
            stateUpdated.simpleJSON.fields = [
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill
            ];
            stateUpdated.simpleJSON.width_door = 600;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 20) {
            stateUpdated.simpleJSON.width = 0;
            stateUpdated.simpleJSON.height = 0;
            stateUpdated.simpleJSON.imposts = [];
            stateUpdated.simpleJSON.fields = [];
            stateUpdated.simpleJSON.width_door = 800;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
        } else if (this.template === 21) {
            stateUpdated.simpleJSON.width = 0;
            stateUpdated.simpleJSON.height = 0;
            stateUpdated.simpleJSON.imposts = [];
            stateUpdated.simpleJSON.fields = [];
            stateUpdated.simpleJSON.width_door = 800;
            stateUpdated.simpleJSON.height_door = 2000;
            stateUpdated.simpleJSON.imposts_door = [600];
            stateUpdated.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
        }
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

export class SetCalculationStatus extends StoreAction {
    constructor(private isCalcInProgress: boolean) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.isCalculationInProgress= this.isCalcInProgress;
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

export class SetIdorderdoc extends StoreAction {
    constructor(private idorderdoc: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.idorderdoc = this.idorderdoc;
        return stateUpdated;
    }
}

export class SetIdorderdocitem extends StoreAction {
    constructor(private idorderdocitem: number) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.idorderdocitem = this.idorderdocitem;
        return stateUpdated;
    }
}

export class SetError extends StoreAction {
    constructor(private error: string) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.error = this.error;
        return stateUpdated;
    }
}

export class SetMobile extends StoreAction {
    constructor(private mobile: boolean) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.mobile = this.mobile;
        return stateUpdated;
    }
}
export class SetPolycadValut extends StoreAction {
    constructor(private valut: PolycadValut) {
        super();
    }
    perform(state: State) {
        const stateUpdated = super.perform(state);
        stateUpdated.settings.polycadValut = this.valut;
        return stateUpdated;
    }
}