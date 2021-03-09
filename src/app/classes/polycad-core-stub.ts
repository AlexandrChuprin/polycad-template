export class Polycad {
    model: any;
    controller: any = {curModelIdx: 0};
    settings: any;
    exporter: SimpleXMLExporter;
    getBase64Svg(data: any) {return '';}
    constructor(a,b,c) {}
}
export class PolycadConstruction {
    isModelChanged = false;
    installOptions: any = {
        interior_id: ''
    };
    models = [];
    constructor(public id: string, public marking: string){}
}
export class SimpleXMLExporter {
    constructor(a) {}
}
export class ViewModel {
    constructor(a,b) {}
    setModel(a) {}
}
export class Base64 {
    static decode(a) {return '';}
}

export class ViewGraphics {
    constructor(a,b,c,d,e,f,g) {}
    redraw(a,b,c,d,e) {}
}
export class DrawOptions {
    constructor(a,b) {}
}
export class Drawer {
    static usedFromIphone = false;
    static initWithSizes(a,b,c,d) {}
}
export class PolycadFill {
    open_type: any;
    available_open_types: any;
}

export class WindowTemplates {
    static templates: PolycadConstruction[] = [
        new PolycadConstruction('1', 'Окно'),
        new PolycadConstruction('2', 'Окно с импостом'),
        new PolycadConstruction('3', 'Окно с импостами'),
        new PolycadConstruction('21', 'Дверь с импостом'),
        new PolycadConstruction('4', 'Балконный блок левый'),
        new PolycadConstruction('5', 'Балконный блок левый с импостом'),
        new PolycadConstruction('6', 'Балконный блок правый'),
        new PolycadConstruction('7', 'Балконный блок правый с импостом')
    ];
}
export class PolycadTemplateGenerator {
    static getAllConstructions(a) {return [];}
}
export class Settings {
    profile_systems = [];
    profiles = [];
    furniture_systems = [];
    color_groups = [];
    colors = [];
    fills = [];
}