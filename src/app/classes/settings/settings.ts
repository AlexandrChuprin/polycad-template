import { Product } from './product';
import { Option } from './option';
import { ProductionType } from './production-type';
import { Addition } from './addition';
import { BehaviorSubject } from 'rxjs';
import { Settings as PolycadSettings } from '@a.chuprin/polycad-core/source/app/model/settings/settings';
import { OptionDependence } from './option-dependence';

export type PolycadValut =
'MGA'|
'AFN'|
'PAB'|
'THB'|
'VEF'|
'BOB'|
'ETB'|
'VUV'|
'KPW'|
'KRW'|
'UAH'|
'PYG'|
'ANG'|
'HTG'|
'GMD'|
'MKD'|
'DZD'|
'BHD'|
'JOD'|
'IQD'|
'KWD'|
'LYD'|
'RSD'|
'TND'|
'MAD'|
'AED'|
'STD'|
'AUD'|
'BSD'|
'BBD'|
'BZD'|
'BMD'|
'BND'|
'XCD'|
'GYD'|
'HKD'|
'ZWD'|
'KYD'|
'CAD'|
'LRD'|
'NAD'|
'NZD'|
'SGD'|
'SBD'|
'USD'|
'SRD'|
'TWD'|
'TTD'|
'FJD'|
'JMD'|
'VND'|
'AMD'|
'EUR'|
'PLN'|
'JPY'|
'AOA'|
'ZMK'|
'MWK'|
'GTQ'|
'PGK'|
'LAK'|
'CRC'|
'NIO'|
'DKK'|
'ISK'|
'NOK'|
'CZK'|
'SEK'|
'HRK'|
'MMK'|
'GEL'|
'LVL'|
'BGN'|
'MDL'|
'RON'|
'ALL'|
'HNL'|
'SLL'|
'SZL'|
'TRY'|
'LTL'|
'LSL'|
'AZN'|
'TMТ'|
'BAM'|
'MZN'|
'NGN'|
'ERN'|
'BTN'|
'TOP'|
'MOP'|
'ARS'|
'DOP'|
'COP'|
'CUP'|
'MXN'|
'UYU'|
'PHP'|
'CLP'|
'BWP'|
'BRL'|
'IRR'|
'YER'|
'QAR'|
'OMR'|
'KHR'|
'MYR'|
'SAR'|
'BYR'|
'RUB'|
'INR'|
'IDR'|
'MUR'|
'NPR'|
'PKR'|
'SCR'|
'LKR'|
'MVR'|
'ZAR'|
'GHS'|
'PEN'|
'KGS'|
'TJS'|
'UZS'|
'BDT'|
'WST'|
'KZT'|
'MNT'|
'MRO'|
'AWG'|
'HUF'|
'BIF'|
'GNF'|
'DJF'|
'KMF'|
'CDF'|
'RWF'|
'CHF'|
'XPF'|
'XOF'|
'XAF'|
'GBP'|
'GIP'|
'EGP'|
'LBP'|
'SHP'|
'SYP'|
'SDG'|
'FKP'|
'ILS'|
'KES'|
'SOS'|
'TZS'|
'UGX'|
'CVE'|
'CNY';

export class Settings {

    public lang = DefaultSettingsLanguage.lang;
    /***/
    public polycadType = 'default';
    public polycadValut: PolycadValut = 'RUB';
    public isCreateAgreementAvailable = false;
    public isOptionsGroupsVisible = false;
    public isOptionsGroupsNamesVisible = false;
    public idgoods: number[] = [];
    public prodtypes: ProductionType[] = [];
    public additions: Addition[] = [];
    public commonOptions: Option[] = [];
    public dependencies: OptionDependence[] = [];
    public options: Option[] = [];
    public products: Product[] = [];
    public availableProducts: Product[] = [];
    public settingsReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get availableProductsCount() {
        this.availableProducts = this.products.filter(product => product.isAvailable);
        if (this.availableProducts) {
            return this.availableProducts.length;
        } else {
            return 0;
        }
    }
    /***/
    constructor() {
    }

    tryCreateOptionFromSettings(option: Option, settingsDynamic: PolycadSettings) {
        let optionLocal = option;
        if (option.settingsId) {
            if (option.group === 'profile') {
                const profile = settingsDynamic.profile_systems.find(_ => _.id === option.settingsId);
                if (profile) {
                    optionLocal = new Option(
                        option.id,
                        option.settingsId,
                        option.group,
                        option.commonGroupName,
                        option.numpos,
                        profile.pic,
                        option.name ? option.name : profile.marking,
                        profile.description,
                        option.checked,
                        option.isCommon,
                        option.isOnlyOneFromGroup,
                        option.visibility,
                        option.dependsOn,
                        option.isActive,
                        option.isSuboption, []
                    );
                }
            }
            if (option.group === 'furniture') {
                const furn = settingsDynamic.furniture_systems.find(_ => _.id === option.settingsId);
                if (furn) {
                    optionLocal = new Option(
                        option.id,
                        option.settingsId,
                        option.group,
                        option.commonGroupName,
                        option.numpos,
                        furn.pic,
                        option.name ? option.name : furn.marking,
                        furn.description,
                        option.checked,
                        option.isCommon,
                        option.isOnlyOneFromGroup,
                        option.visibility,
                        option.dependsOn,
                        option.isActive,
                        option.isSuboption, []
                    );
                }
            }
            if (option.group === 'fill') {
                const fill = settingsDynamic.fills.find(_ => _.id === option.settingsId);
                if (fill) {
                    optionLocal = new Option(
                        option.id,
                        option.settingsId,
                        option.group,
                        option.commonGroupName,
                        option.numpos,
                        fill.pic,
                        option.name ? option.name : fill.marking,
                        fill.description,
                        option.checked,
                        option.isCommon,
                        option.isOnlyOneFromGroup,
                        option.visibility,
                        option.dependsOn,
                        option.isActive,
                        option.isSuboption, []
                    );
                }
            }
        }
        return optionLocal;
    }
    public loadPolycadSettings(settingsPolycad: any, settingsDynamic: PolycadSettings, polycadLang: any) {
        if (settingsPolycad) {
            if (settingsPolycad.additions instanceof Array) {
                this.additions = [...settingsPolycad.additions];
            }
            if (settingsPolycad.options instanceof Array) {
                this.options = [...settingsPolycad.options];
            }
            if (settingsPolycad.dependencies instanceof Array) {
                this.dependencies = [...settingsPolycad.dependencies];
            }
            if (settingsPolycad.prodtypes instanceof Array) {
                this.prodtypes = [...settingsPolycad.prodtypes];
            }
            if (settingsPolycad.products instanceof Array) {

                this.products = [...settingsPolycad.products];
                this.products.forEach(product => {
                    this.passOptionsToProduct(product, settingsDynamic);
                });
            }

            let polycadType, isCreateAgreementAvailable, idgoods, polycadValut, lang;

            if (settingsPolycad.polycadType) {
                polycadType = settingsPolycad.polycadType;
            }
            if (settingsPolycad.polycadValut) {
                polycadValut = settingsPolycad.polycadValut;
            }
            if (settingsPolycad.isCreateAgreementAvailable) {
                isCreateAgreementAvailable = true;
            } else {
                isCreateAgreementAvailable = false;
            }
            if (settingsPolycad.idgoods) {
                idgoods = settingsPolycad.idgoods;
            }

            this.setupSettings(polycadType, polycadValut, isCreateAgreementAvailable, idgoods, settingsDynamic, polycadLang);

        } else {

            const profiles = settingsDynamic.profile_systems;
            // группы цветов
            const colorGroups = [
                {
                    id: 'idgroup-1',
                    marking: 'Без цвета',
                    pic: '',
                    description: ''
                }
            ];
            // цвета покраски
            const colors = [
                {
                    color: '#FFFFFF',
                    id: 'id-001',
                    group: 'idgroup-1',
                    marking: 'Белый',
                    pic: '',
                    description: ''
                },
                {
                    color: '#0000FF',
                    id: 'id-002',
                    group: 'idgroup-1',
                    marking: 'Синий',
                    pic: '',
                    description: ''
                },
                {
                    color: '#FF0000',
                    id: 'id-003',
                    group: 'idgroup-1',
                    marking: 'Красный',
                    pic: '',
                    description: ''
                }
            ];

            const fills = [
                {
                    id: 'id-1',
                    marking: '4-16-4',
                    sound: 1, heat: 1, light: 1,
                    pic: '',
                    description: 'Стандартный стеклопакет',
                    description_full: `Однокамерный стеклопакет`,
                    description_additional: '',
                    link: ''
                },
                {
                    id: 'id-2', marking: '4-8-4-8-4',
                    sound: 2, heat: 2, light: 2,
                    pic: '',
                    description: 'Стеклопакет с улучшеными характеристиками',
                    description_full: `Двухкамерный – 3 стекла, пара рамок`,
                    description_additional: '',
                    link: ''
                }
            ];

            const options = [
                this.getEmptyOption(1),
                new Option('option-ps-cheap', profiles[0].id, 'profile', '', 1, '', '', '', true, false, false, 'showed', [], true, false, []),
                new Option('option-ps-expensive', profiles[1].id, 'profile', '', 1, '', '', '', false, false, false, 'showed', [], true, false, []),
                new Option('option-fill-cheap', fills[0].id, 'fill', '', 2, '', '', '', true, false, false, 'showed', [], true, false, []),
                new Option('option-fill-expensive', fills[1].id, 'fill', '', 2, '', '', '', true, false, false, 'showed', [], true, false, []),

                new Option('antiburglary-common', '', '', '', 2, ' assets/images/options/antiburglary.jpg', 'Противо - взломность', '', true, true, false, 'showed', [], true, false, []),
                new Option('energyefficient-common', '', '', '', 2, 'assets/images/options/energyefficient.jpg', 'Энерго - эффективность', '', true, true, false, 'showed', [], true, false, []),
                new Option('noiseprotection-common', '', '', '' ,2, 'assets/images/options/noiseprotection.jpg', 'Шумозащита', '', true, true, false, 'showed', [], true, false, []),
            ];
            this.options = options;

            const cheapProduct = new Product(0,
                'Стандарт',
                'Стандарт',
                [
                    { numpos: 1, idoption: 'option-ps-cheap', checked: true },
                    { numpos: 2, idoption: 'option-fill-cheap', checked: true  },
                    { numpos: 3, idoption: 'option-empty', checked: false  },
                    { numpos: 4, idoption: 'antiburglary-common', checked: true  },
                    { numpos: 5, idoption: 'energyefficient-common', checked: true  },
                    { numpos: 6, idoption: 'option-empty', checked: true  },
                ],
                [],
                [`https://test.okna.space`]
            );

            const expensiveProduct = new Product(0,
                'Премиум',
                'Премиум',
                [
                    { numpos: 1, idoption: 'option-ps-expensive', checked: true },
                    { numpos: 2, idoption: 'option-empty', checked: false },
                    { numpos: 3, idoption: 'option-fill-expensive', checked: true },
                    { numpos: 4, idoption: 'antiburglary-common', checked: true },
                    { numpos: 5, idoption: 'energyefficient-common', checked: true },
                    { numpos: 6, idoption: 'noiseprotection-common', checked: true },
                ],
                [],
                [`https://test.okna.space`]
            );

            this.products = [
                cheapProduct,
                expensiveProduct
            ];

            this.products.forEach(product => this.setOptionsToProduct(product, this.options, settingsDynamic));

            this.prodtypes = [];
            this.prodtypes.push(new ProductionType('Окно', 'assets/images/templates/template-1.png', '1'));
            this.prodtypes.push(new ProductionType('Окно с импостом', 'assets/images/templates/template-2.png', '2'));
            this.prodtypes.push(new ProductionType('Окно с импостами', 'assets/images/templates/template-3.png', '3'));
            // this.prodtypes.push(new ProductionType('Дверь', 'assets/images/templates/template-20.png', '20'));
            this.prodtypes.push(new ProductionType('Дверь с импостом', 'assets/images/templates/template-21.png', '21'));
            this.prodtypes.push(new ProductionType('Балконный блок левый', 'assets/images/templates/template-4.png', '4'));
            this.prodtypes.push(new ProductionType('Балконный блок левый с импостом', 'assets/images/templates/template-5.png', '5'));
            this.prodtypes.push(new ProductionType('Балконный блок правый', 'assets/images/templates/template-6.png', '6'));
            this.prodtypes.push(new ProductionType('Балконный блок правый с импостом', 'assets/images/templates/template-7.png', '7'));

            this.prodtypes[0].isSelected = true;

            this.additions = [];
            this.additions.push(new Addition('1', 'moskit', 'М/с', 'assets/images/additions/moskit.jpg', []));
            this.additions.push(new Addition('2', 'sill', 'Подоконник', 'assets/images/additions/sill.jpg', []));
            this.additions.push(new Addition('3', 'shutters', 'Жалюзи', 'assets/images/additions/shutters.jpg', []));
            this.additions[0].checked = true;
            this.additions[1].checked = true;

            this.setupSettings('default', 'RUB', false, [28], settingsDynamic, DefaultSettingsLanguage.lang);

            this.settingsReady.next(true);
            // this.settingsReady.complete();

        }
    }

    public passOptionsToProduct(product: Product, settingsDynamic: PolycadSettings) {
        this.setOptionsToProduct(product, this.options, settingsDynamic);
        const localOptions: Option[] = [];
        product.options.forEach(option => {
            localOptions.push(this.tryCreateOptionFromSettings(option, settingsDynamic));
        });
        const fills = localOptions.filter(_ => _.group === 'fill');
        const profile_systems = localOptions.filter(_ => _.group === 'profile');
        const furniture_systems = localOptions.filter(_ => _.group === 'furniture');
        const checkedFill = fills.find(_ => _.checked);
        const checkedPS = profile_systems.find(_ => _.checked);
        const checkedFS = furniture_systems.find(_ => _.checked);
        if (!checkedFill && fills.length) {
            fills[0].checked = true;
        }
        if (!checkedPS && profile_systems.length) {
            profile_systems[0].checked = true;
        }
        if (!checkedFS && furniture_systems.length) {
            furniture_systems[0].checked = true;
        }
        product.options = [...localOptions];
    }

    private setupSettings(
        polycadType: string,
        polycadValut: string,
        isCreateAgreementAvailable: boolean,
        idgoods: number[],
        settingsDynamic: PolycadSettings,
        lang: object
    ) {
        if (lang) {
            this.lang = <any>lang;
        } else {
            this.lang = DefaultSettingsLanguage.lang;
        }
        this.polycadType = polycadType ? polycadType : 'default';
        this.polycadValut = polycadValut as PolycadValut;
        if (idgoods instanceof Array) {
            this.idgoods = [...idgoods];
        }
        this.isCreateAgreementAvailable = isCreateAgreementAvailable ? true : false;
        const psLocal = [];
        const profilesLocal = [];
        const fillsLocal = [];
        let idprofile = 1000;
        let idfill = 1000;
        this.products.forEach(p => {
            this.setOptionsToProduct(p, this.options, settingsDynamic);
            p.options.filter(o => o.group === 'profile')
                .forEach(option => {
                    const hasPS = psLocal.find(_ => _.id === option.settingsId);
                    if (!hasPS) {
                        idprofile += 10;
                        psLocal.push({
                            id: option.settingsId,
                            marking: option.name,
                            pic: option.image,
                            description: option.description,
                            description_full: '',
                            description_additional: '',
                            link: ''
                        });

                        profilesLocal.push(
                            { id: `id-${idprofile}`, marking: 'frame', heat: 0, thick: 50, type: 'frame', system: option.settingsId });
                        profilesLocal.push(
                            { id: `id-${idprofile}`, marking: 'impost', heat: 0, thick: 50, type: 'impost', system: option.settingsId });
                        profilesLocal.push(
                            { id: `id-${idprofile}`, marking: 'leaf', heat: 0, thick: 50, type: 'leaf', system: option.settingsId });
                        profilesLocal.push(
                            { id: `id-${idprofile}`, marking: 'connector', heat: 0, thick: 50, type: 'connector', system: option.settingsId });
                        }
                });
            p.options.filter(o => o.group === 'fill')
                .forEach(option => {
                    const hasFill = fillsLocal.find(_ => _.id === option.settingsId);
                    if (!hasFill) {
                        // idfill++;
                        fillsLocal.push({
                            id: option.settingsId,
                            marking: option.name,
                            sound: 1, heat: 1, light: 1,
                            pic: option.image,
                            description: option.description,
                            description_full: ``,
                            description_additional: '',
                            link: ''
                        });
                    }
                });
        });

        // settingsDynamic.profile_systems = [...psLocal];
        settingsDynamic.profiles = [...profilesLocal];
        // settingsDynamic.fills = [...fillsLocal];

        this.commonOptions = [];

        this.options.forEach(option => {
            const inCommon = this.commonOptions.find(_ => _.id === option.id);
            if (option.isCommon && !inCommon) {
                this.commonOptions.push(option);
            }
        });
        this.commonOptions.forEach(_ => _.checked = false);
        this.commonOptions.sort((a, b) => a.numpos - b.numpos);
        this.options.forEach(_ => _.checked = false);

        // settingsDynamic.settingsPolycad = {
        //     fills,
        //     colors,
        //     color_groups: colorGroups,
        //     furniture_systems: settingsDynamic.settingsPolycad.furniture_systems,
        //     profile_systems: settingsDynamic.settingsPolycad.profile_systems,
        //     profiles: settingsDynamic.settingsPolycad.profiles,
        //     additions: this.additions,
        //     prodtypes: this.prodtypes,
        //     options: this.options,
        //     products: this.products,
        //     polycadType: this.polycadType,
        //     isCreateAgreementAvailable,
        //     idgoods
        // };
    }
    public setOptionsToProduct(product: Product, options: Option[], settingsDynamic: PolycadSettings) {
        product.options = [];
        product.idoptions.sort((a, b) => a.numpos - b.numpos);
        product.idoptions.forEach(_ => {
            const option = options.find(o => o.id === _.idoption);
            if (option) {
                product.options.push(
                    this.tryCreateOptionFromSettings(
                        new Option(
                            option.id,
                            option.settingsId,
                            option.group,
                            option.commonGroupName,
                            _.numpos,
                            option.image,
                            option.name,
                            option.description,
                            _.checked,
                            option.isCommon,
                            option.isOnlyOneFromGroup,
                            option.visibility,
                            option.dependsOn,
                            option.isActive,
                            option.isSuboption, []),
                            settingsDynamic
                    )
                );
            }
        });
    }

    public getEmptyOption(numpos: number): Option {
        const res = new Option('option-empty', '', '', '', numpos, 'assets/images/options/empty.jpg', '', '', false, false, false, '', [], true, false, []);
        return res;
    }

    public setupAvailableProducts() {
        if (this.products && this.commonOptions) {
            this.products.forEach(product => product.isAvailable = true);
            const selectedOptions = this.commonOptions.filter(_ => _.checked);
            if (selectedOptions.length) {
                this.products.forEach(product => {
                    for (let i = 0; i < selectedOptions.length; i++) {
                        const optionId = selectedOptions[i].id;
                        const checkedOption = product.options.find(option => option.id === optionId);
                        if (!checkedOption) {
                            product.isAvailable = false;
                            continue;
                        }
                    }
                });
            }

            this.availableProducts = this.products.filter(product => product.isAvailable);
        }
    }
}


export interface IPolycadFill {
    id: string;
    marking: string;
    sound: number;
    heat: number;
    light: number;
    pic: string;
    description: string;
    description_full: string;
    description_additional: string;
    link: string;
}

export interface IPolycadProfile {
    id: string;
    marking: string;
    sound: number;
    heat: number;
    light: number;
    pic: string;
    description: string;
    description_full: string;
    description_additional: string;
    link: string;
}

export interface IPolycadColor {
    color: string;
    id: string;
    group: string;
    marking: string;
    pic: string;
    description: string;
}

export interface IPolycadColorGroup {
    id: string;
    marking: string;
    pic: string;
    description: string;
}

export class DefaultSettingsLanguage {
    public static lang = {
        'language': 'russian',
        'errorLoadingSettings': 'Ошибка загрузки настроек!',
        'waitingForLoadSettings': 'Ожидаем загрузки настроек',
        'totalCost': 'Общая стоимость',
        'createAgreement': 'Создать договор',
        'showAgreement': 'Показать договор',
        'polycadLanguage': 'Локализация',
        'error': 'Ошибка',
        'additions': 'Дополнения',
        'colors': 'Цвета',
        'outColor': 'Снаружи',
        'inColor': 'Внутри',
        'selectColor': 'Выберите цвет',
        'constructionType': 'Конструктив',
        'options': 'Опции',
        'openTypesAndSizes': 'Открывания и размеры',
        'calculating': 'считаем',
        'availableProductsCount': 'Предложения',
        'basket': 'Корзина',

        'waiting': 'ожидание',
        'settingsEditor': 'Редактор настроек',
        'copyPolycadToken': 'Скопировать token для Polycad',
        'openPolycad': 'Открыть Polycad',
        'loadSettingsFromServer': 'Загрузить настройки с сервера',
        'sendSettingsToServer': 'Отправить настройки на сервер',
        'jsonString': 'Строка настроек (JSON)',
        'loadSettingsFromString': 'Загрузить настройки из строки',
        'copySettingsToClipboard': 'Скопировать настройки в буфер',
        'serviceSettings': 'Служебное',
        'productTypes': 'Типы продукции, доступные редактору',
        'polycadVersion': 'Версия редактора',
        'isCreateAgreementAvailable': 'Доступность кнопки создания договоров',
        'profileSystemsSettings': 'Профильные системы',
        'addProfileSystem': 'Добавить',
        'removeProfileSystem': 'Удалить',
        'furnitureSystemsSettings': 'Фурнитурные системы',
        'addFurnitureSystem': 'Добавить',
        'removeFurnitureSystem': 'Удалить',
        'fillsSettings': 'Заполнения',
        'addFill': 'Добавить',
        'removeFill': 'Удалить',
        'colorsSettings': 'Цвета',
        'addColor': 'Добавить',
        'removeColor': 'Удалить',
        'additionsSettings': 'Дополнения',
        'addAddition': 'Добавить',
        'removeAddition': 'Удалить',
        'optionsSettings': 'Опции',
        'addOption': 'Добавить',
        'removeOption': 'Удалить',
        'copyOptionsToClipboard': 'Скопировать опции в буфер',
        'productsSettings': 'Продукты',
        'addProduct': 'Добавить',
        'removeProduct': 'Удалить',
        'composition': 'Состав',
        'filterOfAvailableOptions': 'Доступные опции, фильтр',
        'polycadLocalization': 'Локализация',
        'calcPrice': 'узнать стоимость',
        'readyDate': 'готовность',
        'dublicateProduct': 'Дублировать',
        'addDependence': 'Добавить',
        'removeDependence': 'Удалить',
        'dependencesDependecies': 'Зависимости',
        'isOptionsGroupsVisible': 'Видимость групп опций',
        'readOnlyMode': 'Режим просмотра. Документ недоступен для изменений.'
    };
}
