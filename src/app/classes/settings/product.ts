import { Option } from './option';
import { ViewModel } from '@a.chuprin/polycad-core';

export type ProductState = 'process' | 'no' | 'yes';

export class Product {

    public addedToBasket = false;
    private m_price = 0;
    public get price(): number {
        return this.m_price;
    }
    public set price(value: number) {
        this.m_price = +value;
    }

    public pic = '';
    public qupos = 1;
    public idorderdocitemFake = 0;
    public model: ViewModel;
    /** Посчитан ли в oknaspace */
    public calced: ProductState = 'no';

    /** Подходит ли по опциям */
    public isAvailable = true;
    /** Опции */
    public options: Option[] = [];
    /***/
    constructor(
        public numpos: number,
        public idproduct: string,
        public name: string,
        public idoptions: IProductOption[],
        public colorPairs: IProductColorPair[],
        public oknaspaceHosts: string[]
    ) {

    }
}

export interface IProductOption {
    idoption: string;
    numpos: number;
    checked: boolean;
}

export interface IProductColorPair {
    idcolorIn: string;
    idcolorOut: string;
}
