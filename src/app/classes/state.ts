import { Polycad, PolycadTemplateGenerator, SimpleXMLExporter, ViewModel, WindowTemplates } from '@a.chuprin/polycad-core';
import { SimpleJSONFill, SimpleJSONModel } from '../interfaces/simple-json';
import { IOption, SettingsPolycad } from './settings/setings-polycad';
import { Settings } from './settings/settings';
import { Profile, ProfileType } from './settings/classes';

export class State {
    
    public calcedSimpleJSON: SimpleJSONModel;
    public isCalculationInProgress = false;
    public mobile = false;
    public calced = false;
    public changed = false;
    public price = 0;
    public qu = 0;
    public idorderdocitem = 0;
    public idorderdoc = 0;
    public settingsLoaded = false;
    public error = '';
    public info = '';
    public title = '';
    public comment = '';
    public settings: Settings = new Settings();
    public page = 'constrtype';
    public pages = ['constrtype', 'colors', 'options', 'systems', 'result'];
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
        profile: null, // SettingsPolycad.profileSystems[0].marking,
        furniture: SettingsPolycad.furnitureSystems[0].marking,
        imposts: [500],
        fields: [
            {open_type: 'none', moskit: false, handle: ''} as SimpleJSONFill,
            {open_type: 'right', moskit: true, handle: 'rotoline'} as SimpleJSONFill
        ],
        glass: SettingsPolycad.fills[0].marking,
        glass_under_impost: '',
        color_in: null, // SettingsPolycad.colors[0].marking,
        color_out: null, // SettingsPolycad.colors[0].marking,
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

    public polycad: Polycad;
    public locale = 'ru-RU';
    get moneyLabel() {
        const valut = this.settings
            && this.settings.polycadValut;
        return valut ? valut : 'RUB';
    }

    get canCalc() {
        const isAllFilled = this.simpleJSON != null
            && this.simpleJSON.color_in != null
            && this.simpleJSON.color_out != null
            && this.simpleJSON.profile != null
            && !this.changed
        ;
        return isAllFilled;
    }

    applySettings(settingsPolycad: any) {
        const settings = SettingsPolycad.settings;

        if (settingsPolycad.profile_systems && settingsPolycad.profile_systems instanceof Array) {
            settings.profile_systems = [...settingsPolycad.profile_systems];
            SettingsPolycad.profileSystems = [...settings.profile_systems];
        }
        if (settingsPolycad.profiles && settingsPolycad.profiles instanceof Array) {
            settings.profiles = [...settingsPolycad.profiles];
            SettingsPolycad.profiles = [];
            settings.profiles.forEach(p => {
                const profile = new Profile(p.id, p.marking, 1, p.thick, p.type as ProfileType, p.system);
                SettingsPolycad.profiles.push(profile);
            });
        }
        if (settingsPolycad.furniture_systems && settingsPolycad.furniture_systems instanceof Array) {
            settings.furniture_systems = [...settingsPolycad.furniture_systems];
            SettingsPolycad.furnitureSystems = [...settings.furniture_systems];
        }
        if (settingsPolycad.color_groups && settingsPolycad.color_groups instanceof Array) {
            settings.color_groups = [...settingsPolycad.color_groups];
            SettingsPolycad.colorGroups = [...settings.color_groups];
        }
        if (settingsPolycad.colors && settingsPolycad.colors instanceof Array) {
            settings.colors = [...settingsPolycad.colors];
            SettingsPolycad.colors = [...settings.colors];
        }
        if (settingsPolycad.fills && settingsPolycad.fills instanceof Array) {
            settings.fills = [...settingsPolycad.fills];
            SettingsPolycad.fills = [...settings.fills];
        }
        if (settingsPolycad.idgoods && settingsPolycad.idgoods instanceof Array) {
            this.settings.idgoods = [...settingsPolycad.idgoods];
        }
        if (settingsPolycad.additions && settingsPolycad.additions instanceof Array) {
            this.settings.additions = [...settingsPolycad.additions];
        }

        if (settingsPolycad.visibleWindowTypes && settingsPolycad.visibleWindowTypes instanceof Array) {
            this.settings.visibleWindowTypes = [...settingsPolycad.visibleWindowTypes];
        } else {
            this.settings.visibleWindowTypes = [];
        }
        if (settingsPolycad.windowTypesOpenTypes && settingsPolycad.windowTypesOpenTypes instanceof Array) {
            this.settings.windowTypesOpenTypes = [...settingsPolycad.windowTypesOpenTypes];
        } else {
            this.settings.windowTypesOpenTypes = [];
        }

        if (settingsPolycad.options && settingsPolycad.options instanceof Array) {
            this.settings.options = [...settingsPolycad.options];
            SettingsPolycad.options = [];
            this.settings.options.forEach(o => {
                if (o.name && !o.isSuboption && !o.id.includes('empty') && o.group !== 'fill') { // && !o.group) {
                    const suboptions = this.settings.options.filter(_ => _.isSuboption && _.dependsOn && _.dependsOn.includes(o.id))

                    const ioption = <IOption>{
                        idoption: o.id,
                        suboptions: suboptions.map(_ => <IOption>{idoption: _.id, name: _.name, description: _.description, checked: _.checked}),
                        name: o.name,
                        description: o.description,
                        disabledOpenTypes: o.disabledOpenTypes,
                        disabledProducts: o.disabledProducts,
                        image: o.image,
                        checked: o.checked,
                        isActive: o.isActive,
                        visibility: o.visibility,
                        isOnlyOneFromGroup: o.isOnlyOneFromGroup,
                        isCommon: o.isCommon,
                        numpos: isNaN(+o.numpos) ? 0 : +o.numpos,
                    };
                    SettingsPolycad.options.push(ioption);
                }
            })
        }
        if (settingsPolycad.dependencies && settingsPolycad.dependencies instanceof Array) {
            this.settings.dependencies = [...settingsPolycad.dependencies];
        }
        if (settingsPolycad.prodtypes && settingsPolycad.prodtypes instanceof Array) {
            this.settings.prodtypes = [...settingsPolycad.prodtypes];
        }
        if (settingsPolycad.products && settingsPolycad.products instanceof Array) {
            this.settings.products = [...settingsPolycad.products];
        }
        if (settingsPolycad.polycadType) {
            this.settings.polycadType = settingsPolycad.polycadType;
        }
        if (settingsPolycad.polycadValut) {
            this.settings.polycadValut = settingsPolycad.polycadValut;
        }
        if (settingsPolycad.isCreateAgreementAvailable) {
            this.settings.isCreateAgreementAvailable = settingsPolycad.isCreateAgreementAvailable;
        }
        if (settingsPolycad.isOptionsGroupsVisible) {
            this.settings.isOptionsGroupsVisible = settingsPolycad.isOptionsGroupsVisible;
        }
        // this.basketOrderdocitems = [
        //     new BasketOrderdocitem(0, 1, ``, `Окно`, 2, 1200.23, '800 x 600'),
        //     new BasketOrderdocitem(0, 2, ``, `Дверь`, 1, 1300.55, '800 x 2000'),
        //     new BasketOrderdocitem(0, 3, ``, `Балкон`, 1, 3400.77, '1800 x 2000'),
        // ];
        const constructions = PolycadTemplateGenerator.getAllConstructions(settings);
        for (let i = 0; i < constructions.length; i++) {
            const polycadConstruction = constructions[i];

            // const constructionJSON = JSON.stringify(polycadConstruction, null, '	');
            // console.log(constructionJSON);
            polycadConstruction.installOptions.outside_id = Math.floor(Math.random() * 10 + 1);
            polycadConstruction.installOptions.interior_id = 11 * i + 1 + i;
            if (i === 7) {
                polycadConstruction.installOptions.interior_id = 400;
            }
            if (i > 7) {
                polycadConstruction.installOptions.interior_id -= 11;
            }
            if (i === 11) {
                polycadConstruction.installOptions.interior_id = 111;
            }
            if (i === 12) {
                polycadConstruction.installOptions.interior_id = 122;
            }
            if (i === 13) {
                polycadConstruction.installOptions.interior_id = 133;
            }
            if (i === 14 || i === 15) {
                polycadConstruction.installOptions.interior_id = 200;
                polycadConstruction.installOptions.outside_id = 20;
            }
            if (i === 16) {
                polycadConstruction.installOptions.interior_id = 300;
            }

            let w = 1000;
            let h = 1300;

            const templateIdx = +polycadConstruction.id.replace('template-', '');
            // Конструкция - Дверь
            const isDoor = (templateIdx === 20 || templateIdx === 21);
            // Конструкция - балконный блок
            const isBB = (templateIdx > 3 && templateIdx < 8);
            // Конструкция - балконный блок (окно справа)
            const isLBB = (templateIdx === 7 || templateIdx === 6);
            // Конструкция - балконный блок (окно слева)
            const isRBB = (templateIdx === 4 || templateIdx === 5);

            if (!isDoor && !isBB) {
                if (templateIdx === 1) { w = 800; h = 1000; }
                if (templateIdx === 2) { w = 1000; h = 1000; }
                if (templateIdx === 3) { w = 1500; h = 1300; }
                polycadConstruction.models[0].width = w;
                polycadConstruction.models[0].height = h;
            } else {
                if (isDoor) {
                    w = 900;
                    h = 2000;

                    polycadConstruction.models[0].width = w;
                    polycadConstruction.models[0].height = h;
                    // polycadConstruction.models[0].imp_poses = [600];
                    polycadConstruction.models[0].door_imp_poses = [600];
                }
                if (isBB) {
                    if (templateIdx === 4) { w = 1500; h = 2000; }
                    if (templateIdx === 5) { w = 1800; h = 2000; }
                    if (templateIdx === 6) { w = 1500; h = 2000; }
                    if (templateIdx === 7) { w = 1800; h = 2000; }

                    // Дверь справа
                    if (isLBB) {
                        if (templateIdx === 6) {
                            polycadConstruction.models[0].width = 600;
                            polycadConstruction.models[0].height = 1200;
                            polycadConstruction.models[1].width = 800;
                            polycadConstruction.models[1].height = 2000;
                            // polycadConstruction.models[1].imp_poses = [600];
                            polycadConstruction.models[1].door_imp_poses = [600];
                        }
                        if (templateIdx === 7) {
                            polycadConstruction.models[0].width = 1000;
                            polycadConstruction.models[0].height = 1200;
                            polycadConstruction.models[0].imp_poses = [500];
                            polycadConstruction.models[1].width = 800;
                            polycadConstruction.models[1].height = 2000;
                            // polycadConstruction.models[1].imp_poses = [600];
                            polycadConstruction.models[1].door_imp_poses = [600];
                        }

                    }
                    // Дверь слева
                    if (isRBB) {
                        if (templateIdx === 4) {
                            polycadConstruction.models[0].width = 800;
                            polycadConstruction.models[0].height = 2000;
                            // polycadConstruction.models[0].imp_poses = [600];
                            polycadConstruction.models[0].door_imp_poses = [600];
                            polycadConstruction.models[1].width = 600;
                            polycadConstruction.models[1].height = 1200;
                        }
                        if (templateIdx === 5) {
                            polycadConstruction.models[0].width = 800;
                            polycadConstruction.models[0].height = 2000;
                            // polycadConstruction.models[0].imp_poses = [600];
                            polycadConstruction.models[0].door_imp_poses = [600];
                            polycadConstruction.models[1].width = 1000;
                            polycadConstruction.models[1].height = 1200;
                            polycadConstruction.models[1].imp_poses = [500];
                        }
                    }
                }
            }
            for (let j = 0; j < polycadConstruction.models.length; j++) {
                const model = polycadConstruction.models[j];
                if (model) {
                    const impCount = model.imp_poses.length;
                    if (impCount > 0) {
                        for (let k = 0; k < impCount; k++) {
                            polycadConstruction.editable_impost = k;
                            polycadConstruction.models[j].imp_poses[k] = 500;
                            const pos = (k + 1) * polycadConstruction.models[j].width / (impCount + 1);
                            polycadConstruction.editable_impost = k;
                            polycadConstruction.models[j].imp_poses[k] = +pos;
                        }
                    }
                }
            }

            for (let j = 0; j < polycadConstruction.models.length; j++) {
                polycadConstruction.models[j].back_color = settings.colors[0].id;
                polycadConstruction.models[j].color_inside_marking = settings.colors[0].marking;
                polycadConstruction.models[j].front_color = settings.colors[0].id;
                polycadConstruction.models[j].color_outside_marking = settings.colors[0].marking;
            }

            WindowTemplates.templates[i] = polycadConstruction;
            WindowTemplates.templates[i].models
                .forEach(m => m.fills
                    .forEach(f =>
                        f.available_open_types = [0, 1, 2, 4, 3, 5]));


            const tmp = polycadConstruction;
            // Ставим всем проемам доступные типы открывания
            if (this.settings.windowTypesOpenTypes && this.settings.windowTypesOpenTypes.length) {
                const ots = this.settings.windowTypesOpenTypes.find(_ => _.windowType === templateIdx);
                if (ots) {
                    // const defot = ['none','left','right','down','up','left-down','right-down'];
                    const defot = [
                        'none',
                        'down',
                        'left',
                        'right',
                        'left-down',
                        'right-down',
                        'slide-left',
                        'slide-right'
                    ];
                    if (templateIdx < 4) {
                        for (let i = 0; i < tmp.models[0].fills.length; i++) {
                            const choised = [];
                            ots.openTypes[i].forEach(ot => choised.push(defot.indexOf(ot)));
                            tmp.models[0].fills[i].available_open_types = choised.filter(_ => _ > -1);
                        }
                    } else if (templateIdx == 4 && ots.openTypes && ots.openTypes.length === 2) {
                        let choised = [];
                        ots.openTypes[0].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[1].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[1].fills[0].available_open_types = choised.filter(_ => _ > -1);
                    } else if (templateIdx == 5 && ots.openTypes && ots.openTypes.length === 3) {
                        let choised = [];
                        ots.openTypes[0].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[1].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[1].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[2].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[1].fills[1].available_open_types = choised.filter(_ => _ > -1);
                    } else if (templateIdx == 6 && ots.openTypes && ots.openTypes.length === 2) {
                        let choised = [];
                        ots.openTypes[1].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[1].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[0].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[0].available_open_types = choised.filter(_ => _ > -1);

                    } else if (templateIdx == 7 && ots.openTypes && ots.openTypes.length === 3) {

                        let choised = [];
                        ots.openTypes[2].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[1].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[0].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[0].available_open_types = choised.filter(_ => _ > -1);
                        choised = [];
                        ots.openTypes[1].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[1].available_open_types = choised.filter(_ => _ > -1);

                    } else if (templateIdx == 20 || templateIdx == 21 && ots.openTypes && ots.openTypes.length === 1) {
                        let choised = [];
                        ots.openTypes[0].forEach(ot => choised.push(defot.indexOf(ot)));
                        tmp.models[0].fills[0].available_open_types = choised.filter(_ => _ > -1);
                    }
                }
            }
            // убираем недоступные типы изделий
            if (this.settings.visibleWindowTypes && this.settings.visibleWindowTypes.length) {
                this.settings.initProdtypes();
                if (!this.settings.visibleWindowTypes.includes(templateIdx)) {
                    this.settings.prodtypes = this.settings.prodtypes.filter(pt => pt.idtemplate != templateIdx+'');
                }
            }
        }


        WindowTemplates.templates[0].marking = 'Окно';
        WindowTemplates.templates[1].marking = 'Окно с импостом';
        WindowTemplates.templates[2].marking = 'Окно с импостами';

        const template = WindowTemplates.templates[0];
        template.isModelChanged = true;
        const pageStub = { document: null, window: null };
        const polycad: Polycad = new Polycad(pageStub, '', false);
        polycad.settings = settings;
        polycad.exporter = new SimpleXMLExporter(polycad.settings);
        template.installOptions.interior_id = 1;
        polycad.model = new ViewModel(template, polycad.settings);
        polycad.model.setModel(template);
        polycad.model.width = 1000;
        polycad.model.height = 1000;
        this.polycad = polycad;
        if (this.settings.prodtypes && this.settings.prodtypes.length) {
            this.settings.prodtypes[0].isSelected = true;
        }
        console.log('CONSTRUCTION CREATED!');

        // console.log(JSON.stringify(this.settings));
        this.settings.loadPolycadSettings(this.settings, this.polycad.settings, settingsPolycad.lang);
    }

    getPriceString(price: number): string {
        const options = { style: 'currency', currency: this.moneyLabel, minimumFractionDigits: 2, maximumFractionDigits: 2 };
        if (price >= 0) {
            return price.toLocaleString(this.locale, options);
        } else {
            return `---`;
        }
    }

}
