import { SimpleJSONFill, SimpleJSONModel } from '../interfaces/simple-json';

export class State {
    public title = '';
    public comment = '';
    public page = 'constrtype';
    public pages = ['constrtype', 'colors', 'options', 'systems', 'params', 'result', 'basket'];
    public simpleJSON: SimpleJSONModel = {
        idgood: 0,
        length: 0,
        qupos: 1,
        idproduct: 'window',
        idorderdoc: 0,
        idorderdocitem: 0,
        template: 1,
        idtemplate: '1',
        width: 1000,
        height: 1000,
        profile: 'Rehau Euro 60',
        furniture: 'Siegenia',
        imposts: [500],
        fields: [
            {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
            {open_type: 'right', moskit: true, handle: 'rotoline'} as SimpleJSONFill
        ],
        glass: '4-16-4',
        glass_under_impost: '',
        color_in: 'Белый',
        color_out: 'Белый',
        width_door: 800,
        height_door: 2000,
        imposts_door: [],
        fields_door: [{open_type: 'left', moskit: false, handle: ''} as SimpleJSONFill],
        pic: '',
        additions: [],
        idoptions: [],
        polycadbasket: 0,
        params: []
    };
}
