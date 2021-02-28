export class OptionDependence {
    /***/
    constructor(
        /** идентификатор */
        public id: string,
        /** наименование */
        public name: string,
        /** идентификатор продукта */
        public idproduct: string,
        /** идентификатор связанной опции */
        public idoption: string,
        /** идентификатор заменяемой опции */
        public idoptionToChange: string,
        /** идентификатор заменяющей опции */
        public idoptionToReplace: string,

        /** набор опций для точного подбора  */
        public idoptionsCombination: string[],
        /** идентификатор заменяемой опции */
        public idoptionsToChange: string[],
        /** идентификатор заменяющей опции */
        public idoptionsToReplace: string[],
    ) {

    }
}
