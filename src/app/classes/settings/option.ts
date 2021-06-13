export class Option {
    /***/
    constructor(
        public id: string,
        public settingsId: string,
        public group: string,
        public commonGroupName: string,
        public numpos: number,
        public image: string,
        public name: string,
        public description: string,
        public checked: boolean,
        public isCommon: boolean,
        public isOnlyOneFromGroup: boolean,
        public visibility: string,
        public dependsOn: string[],
        public isActive: boolean,
        public isSuboption: boolean,
        public disabledOpenTypes: string[],
        public disabledProducts: string[]) {

    }
}
