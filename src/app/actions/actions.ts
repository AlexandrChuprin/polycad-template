import { PolycadValut } from '../classes/settings/settings';
import { State } from '../classes/state';
import { SimpleJSONFill, Template } from '../interfaces/simple-json';
import { StoreAction } from './store-action';

export class SelectTemplate extends StoreAction {
    constructor(private template: Template) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.template = this.template;
        newStateObject.simpleJSON.idtemplate = this.template.toString();
        if (this.template === 1) {
            newStateObject.simpleJSON.width = 600;
            newStateObject.simpleJSON.height = 800;
            newStateObject.simpleJSON.imposts = [];
            newStateObject.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 0;
            newStateObject.simpleJSON.height_door = 0;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [];
        } else if (this.template === 2) {
            newStateObject.simpleJSON.width = 1000;
            newStateObject.simpleJSON.height = 800;
            newStateObject.simpleJSON.imposts = [500];
            newStateObject.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 0;
            newStateObject.simpleJSON.height_door = 0;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [];
        } else if (this.template === 3) {
            newStateObject.simpleJSON.width = 1500;
            newStateObject.simpleJSON.height = 800;
            newStateObject.simpleJSON.imposts = [500, 1000];
            newStateObject.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 0;
            newStateObject.simpleJSON.height_door = 0;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [];
        } else if (this.template === 4) {
            newStateObject.simpleJSON.width = 700;
            newStateObject.simpleJSON.height = 1200;
            newStateObject.simpleJSON.imposts = [];
            newStateObject.simpleJSON.fields = [
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 600;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 6) {
            newStateObject.simpleJSON.width = 700;
            newStateObject.simpleJSON.height = 1200;
            newStateObject.simpleJSON.imposts = [];
            newStateObject.simpleJSON.fields = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 600;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 5) {
            newStateObject.simpleJSON.width = 1000;
            newStateObject.simpleJSON.height = 1200;
            newStateObject.simpleJSON.imposts = [500];
            newStateObject.simpleJSON.fields = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 600;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 7) {
            newStateObject.simpleJSON.width = 1000;
            newStateObject.simpleJSON.height = 1200;
            newStateObject.simpleJSON.imposts = [500];
            newStateObject.simpleJSON.fields = [
                {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill
            ];
            newStateObject.simpleJSON.width_door = 600;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'right', moskit: false, handle: ''} as SimpleJSONFill,
            ];
        } else if (this.template === 20) {
            newStateObject.simpleJSON.width = 0;
            newStateObject.simpleJSON.height = 0;
            newStateObject.simpleJSON.imposts = [];
            newStateObject.simpleJSON.fields = [];
            newStateObject.simpleJSON.width_door = 800;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
        } else if (this.template === 21) {
            newStateObject.simpleJSON.width = 0;
            newStateObject.simpleJSON.height = 0;
            newStateObject.simpleJSON.imposts = [];
            newStateObject.simpleJSON.fields = [];
            newStateObject.simpleJSON.width_door = 800;
            newStateObject.simpleJSON.height_door = 2000;
            newStateObject.simpleJSON.imposts_door = [600];
            newStateObject.simpleJSON.fields_door = [
                {open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill
            ];
        }
        return newStateObject;
    }
}

export class SetTitleAndComment extends StoreAction {
    constructor(private title: string, private comment: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.title = this.title;
        newStateObject.comment = this.comment;
        return newStateObject;
    }
}

export class SetCalculationStatus extends StoreAction {
    constructor(private isCalcInProgress: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.isCalculationInProgress= this.isCalcInProgress;
        return newStateObject;
    }
}

export class SetWindowWidth extends StoreAction {
    constructor(private width: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.width = this.width;
        return newStateObject;
    }
}
export class SetWindowHeight extends StoreAction {
    constructor(private height: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.height = this.height;
        return newStateObject;
    }
}

export class SetWindowImpPositions extends StoreAction {
    constructor(private impPositions: number[]) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.imposts = [...this.impPositions];
        return newStateObject;
    }
}

export class SetWindowFills extends StoreAction {
    constructor(private fills: SimpleJSONFill[]) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.fields = [...this.fills];
        return newStateObject;
    }
}

export class SetDoorWidth extends StoreAction {
    constructor(private width: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.width_door = this.width;
        return newStateObject;
    }
}

export class SetDoorHeight extends StoreAction {
    constructor(private height: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.height_door = this.height;
        return newStateObject;
    }
}

export class SetDoorImpPositions extends StoreAction {
    constructor(private impPositions: number[]) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.imposts_door = [...this.impPositions];
        return newStateObject;
    }
}

export class SetDoorFills extends StoreAction {
    constructor(private fills: SimpleJSONFill[]) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.fields_door = [...this.fills];
        return newStateObject;
    }
}

export class SetProfile extends StoreAction {
    constructor(private profile: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.profile = this.profile;
        return newStateObject;
    }
}

export class SetFurniture extends StoreAction {
    constructor(private furniture: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.furniture = this.furniture;
        return newStateObject;
    }
}

export class SetGlass extends StoreAction {
    constructor(private glass: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.glass = this.glass;
        return newStateObject;
    }
}

export class SetColorIn extends StoreAction {
    constructor(private colorIn: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.color_in = this.colorIn;
        return newStateObject;
    }
}

export class SetColorOut extends StoreAction {
    constructor(private colorOut: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.simpleJSON.color_out = this.colorOut;
        return newStateObject;
    }
}

export class SetOption extends StoreAction {
    constructor(private option: string, private checked: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        const idx = newStateObject.simpleJSON.idoptions.indexOf(this.option);
        if (idx > -1) {
            if (!this.checked) {
                newStateObject.simpleJSON.idoptions.splice(idx, 1);
            }
        } else {
            if (this.checked) {
                newStateObject.simpleJSON.idoptions.push(this.option);
            }
        }
        return newStateObject;
    }
}

export class SetIdorderdoc extends StoreAction {
    constructor(private idorderdoc: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.idorderdoc = this.idorderdoc;
        return newStateObject;
    }
}

export class SetSettingsLoaded extends StoreAction {
    constructor(private settingsLoaded: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.settingsLoaded = this.settingsLoaded;
        return newStateObject;
    }
}
export class SetOrderdocitemPrice extends StoreAction {
    constructor(private price: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.price = this.price;
        return newStateObject;
    }
}
export class SetOrderdocitemQu extends StoreAction {
    constructor(private qu: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.qu = this.qu;
        return newStateObject;
    }
}
export class SetIdorderdocitem extends StoreAction {
    constructor(private idorderdocitem: number) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.idorderdocitem = this.idorderdocitem;
        return newStateObject;
    }
}

export class SetError extends StoreAction {
    constructor(private error: string) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.error = this.error;
        return newStateObject;
    }
}

export class SetMobile extends StoreAction {
    constructor(private mobile: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.mobile = this.mobile;
        return newStateObject;
    }
}
export class SetPolycadValut extends StoreAction {
    constructor(private valut: PolycadValut) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.settings.polycadValut = this.valut;
        return newStateObject;
    }
}

export class SetCalced extends StoreAction {
    constructor(private calced: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.calced = this.calced;
        return newStateObject;
    }
}

export class SetChanged extends StoreAction {
    constructor(private changed: boolean) {
        super();
    }
    perform(lastState: State) {
        const newStateObject = super.perform(lastState);
        newStateObject.changed = this.changed;
        return newStateObject;
    }
}