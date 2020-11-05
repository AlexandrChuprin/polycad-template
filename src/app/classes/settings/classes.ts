
export class ProfileSystem {
    constructor(
        public id: string,
        public marking: string,
        public pic: string,
        public description: string,
        public description_full: string,
        public description_additional: string,
        public link: string
    ) {}
}
export type ProfileType = 'frame'|'impost'|'leaf'|'connector';
export class Profile {
    constructor(
        public id: string,
        public marking: string,
        public heat: number,
        public thick: number,
        public type: ProfileType,
        public system: string
    ) {}
}
export class FurnitureSystem {
    constructor(
        public id: string,
        public marking: string,
        public pic: string,
        public description: string,
        public description_full: string,
        public description_additional: string,
        public link: string
    ) {}
}
export class ColorGroup {
    constructor(
        public id: string,
        public marking: string,
        public pic: string,
        public description: string
    ) {}
}
export class Color {
    constructor(
        public color: string,
        public id: string,
        public group: string,
        public marking: string,
        public pic: string,
        public description: string
    ) {}
}
export class Fill {
    constructor(
        public id: string,
        public marking: string,
        public sound: number,
        public heat: number,
        public light: number,
        public pic: string,
        public description: string,
        public description_full: string,
        public description_additional: string,
        public link: string
    ) {}
}
