/**
 * Шаблон
 * 1 - одностворчатое
 * 2 - двустворчатое
 * 3 - трехстворчатое
 * 4 - ББ окно (одностворчатое) справа, дверь с импостом и сендвичем
 * 5 - ББ окно (двустворчатое) справа, дверь с импостом и сендвичем
 * 6 - ББ окно (одностворчатое) слева, дверь с импостом и сендвичем
 * 7 - ББ окно (двустворчатое) слева, дверь с импостом и сендвичем
 * 20 - Дверь без импоста
 * 21 - Дверь с горизонтальным импостом и сендвичем
 */
export type Template = 1|2|3|4|5|6|7|20|21;
export function getTemplateDescription(id: Template) {
    switch (id) {
        case 1: return 'Окно одностворчатое';
        case 2: return 'Окно двустворчатое';
        case 3: return 'Окно трехстворчатое';
        case 4: return 'ББ окно (одностворчатое) справа, дверь с импостом и сендвичем';
        case 5: return 'ББ окно (двустворчатое) справа, дверь с импостом и сендвичем';
        case 6: return 'ББ окно (одностворчатое) слева, дверь с импостом и сендвичем';
        case 7: return 'ББ окно (двустворчатое) слева, дверь с импостом и сендвичем';
        case 20: return 'Дверь без импоста';
        case 21: return 'Дверь с горизонтальным импостом и сендвичем';
        default: return 'Неизвестный шаблон';
    }
}
/**
 * Тип открывания
 * none - глухое
 * left - влево
 * right - вправо
 * down - откидное
 * up - подвесное
 * left-down - поворотно-откидное влево
 * right-down - поворотно-откидное влево
 */
export type OpenType = 'none' | 'left' | 'right' | 'down' | 'up' | 'left-down' | 'right-down';
export function getOpenTypeDescription(opentype: OpenType) {
    switch (opentype) {
        case 'none': return 'Глухое';
        case 'left': return 'Влево';
        case 'right': return 'Вправо';
        case 'down': return 'Откидное';
        case 'up': return 'Подвесное';
        case 'left-down': return 'Пов.-откид. влево';
        case 'right-down': return 'Пов.-откид. вправо';
        default: return 'Неизвестное открывание';
    }
}

export interface SimpleJSONFill {
    open_type: OpenType;
    moskit: boolean;
    handle: string;
}

export interface SimpleJSONModel {
    idgood: number;
    length: number;
    qupos: number;
    idproduct: string;
    idorderdoc: number;
    idorderdocitem: number;
    template: Template;
    idtemplate: string;
    width: number;
    height: number;
    profile: string;
    furniture: string;
    imposts: number[];
    fields: SimpleJSONFill[];
    glass: string;
    glass_under_impost: string;
    color_in: string;
    color_out: string;
    width_door: number;
    height_door: number;
    imposts_door: number[];
    fields_door: SimpleJSONFill[];
    pic: string;
    additions: string[];
    idoptions: string[];
    polycadbasket: number;
    params: object[];
}
