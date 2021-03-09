import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap, reduce } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Base64 } from '@a.chuprin/polycad-core';
import { Base64 } from './classes/polycad-core-stub';
import { Router } from '@angular/router';
import { SimpleJSONModel } from './interfaces/simple-json';
@Injectable({
    providedIn: 'root'
})
export class OknaspaceExchangeService {
    public static origin = '*';
    public error: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public initialOrderdocId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public idcustomer = '';
    public idcustomerdepartment = '';

    private cadData: ICadData;
    private host = '';
    private token = ``;
    private urlUpdateOrderdocitem = `/api/orderdocitem`;

    /** Send a message to the parent */
    static sendMessage(msg: string) {
        // Make sure you are sending a string, and to stringify JSON
        if (this.origin != null && this.origin !== 'null') {
            window.parent.postMessage(msg, this.origin);
        }
    }
    /** Send a message to the parent */
    static sendErrorMessage(error: any) {
        // Make sure you are sending a string, and to stringify JSON
        if (this.origin != null && this.origin !== 'null') {
            window.parent.postMessage(error, this.origin);
        }
    }
    /** Обработка ошибки извлечения данных */
    static handleError(error: any): Observable<Error> {
        OknaspaceExchangeService.sendMessage(error);
        if (error instanceof HttpErrorResponse) {
            let errMsg: string;
            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                errMsg = `An error occurred: ${error.error.message}`;
                return throwError(new Error(errMsg));
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                errMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
                if (error.status === 401) {
                    return throwError(new UnauthorizedAccess(errMsg));
                } else if (error.status === 404) {
                    return throwError(new NotFound(errMsg));
                } else {
                    return throwError(new Error(errMsg));
                }
            }
        } else {
            return throwError(error);
        }
    }

    private urlGetOrderdoc(idordrdoc: number) {
        return `/api/orderdoc/${idordrdoc}`;
    }
    private urlCreateOrderdoc() {
        return `/api/orderdoc/${this.idcustomerdepartment}`;
    }
    private urlCreateOrderdocitem() {
        return `/api/generate_polycad_model/${this.idcustomerdepartment}`;
    }
    private urlDeleteOrderdocitem(idorderdocitem: number) {
        return `/api/orderdocitem/${idorderdocitem}`;
    }
    public urlLoadSettings(idcustomerdepartment: string) {
        return `/api/load_polycad_settings/${idcustomerdepartment}`;
    }
    private urlGetSettings(idcustomerdepartment: string) {
        return `/api/get_polycad_settings/${idcustomerdepartment}`;
    }
    private urlLoadOrderdocitem(idorderdocitem: number) {
        return `/api/orderdocitem/${idorderdocitem}`;
    }
    private urlLoadOrderdocitems(idorderdoc: number) {
        return `/api/orderdoc/${idorderdoc}/orderdocitem`;
    }
    private urlLoadOrderdocmodel(idorderdocitem: number) {
        return `/api/orderdocitem/${idorderdocitem}/orderdocmodel`;
    }
    public urlLoadPolycadLocalization() {
        return `/api/prodlinelocale`;
    }
    public urlLoadIdgoodsPolycad() {
        return `/api/get_idgoods_polycad_controller`;
    }

    constructor(
        public http: HttpClient,
        private router: Router) {

    }

    commonHeaders() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer<${this.token}>`
        });
        return headers;
    }

    get(url: string) {
        const headers = this.commonHeaders();
        return this.http.get(url, { headers });
    }
    post(url: string, body: any) {
        const headers = this.commonHeaders();
        return this.http.post(url, body, { headers });
    }
    delete(url: string) {
        const headers = this.commonHeaders();
        return this.http.delete(url, { headers });
    }

    loadPolycadSettingsToOS(idcustomerdepartment: string, settings: object): Observable<number> {
        const url = `${this.host}${this.urlLoadSettings(idcustomerdepartment)}`;
        // console.log(Settings.polycadSettings.settingsPolycad.profile_systems);
        settings['lang']['idlanguage'] = this.cadData.idlanguage;
        const body = { polycadSettings: settings };

        return this.post(url, body)
            .pipe(
                switchMap((result: any) => {
                    console.log('loadPolycadSettings result:');
                    console.log(result);
                    if (result) {
                        return of(1);
                    } else {
                        return of(0);
                    }
                })
            );
    }
    loadPolycadSettingsFromOS(idcustomerdepartment: string): Observable<string> {
        const url = `${this.host}${this.urlGetSettings(idcustomerdepartment)}`;

        return this.post(url, {})
            .pipe(
                switchMap((result: { settingsPolycad: string }) => {
                    console.log('getPolycadSettings result:');
                    console.log(result !== null);
                    if (result) {
                        return of(result.settingsPolycad);
                    } else {
                        return of('');
                    }
                })
            );
    }

    loadPolycadLocalizationFromOS() {
        const url = `${this.host}${this.urlLoadPolycadLocalization()}`;

        return this.get(url);
    }

    loadIdgoodsPolycadFromOS() {
        const url = `${this.host}${this.urlLoadIdgoodsPolycad()}`;

        return this.get(url);
    }

    getOrderdoc(idorderdoc: number): Observable<OSOrderdoc> {

        const url = `${this.host}${this.urlGetOrderdoc(idorderdoc)}`;
        return this.get(url)
            .pipe(
                switchMap((result: OSOrderdocResponse) => {
                    if (result && result.message === 'Successful' && result.result.data && result.result.data.length) {
                        return of(result.result.data[0]);
                    } else {
                        return of(null);
                    }
                })
            );
    }

    createOrderdoc(): Observable<number> {

        const orderdoc = { idcustomer: this.idcustomer };
        const emptyBody: EmptyBody = { data: [orderdoc] };
        const url = `${this.host}${this.urlCreateOrderdoc()}`;
        return this.post(url, emptyBody)
            .pipe(
                switchMap((result: OSCreateOrderdocResponse) => {
                    if (result && result.message === 'Successful' && result.result.length) {
                        const idorderdoc = result.result[0].key_value;
                        const msg = idorderdoc > 0 ? idorderdoc.toString() : 'Не удалось получить номер заказа';
                        OknaspaceExchangeService.sendMessage(msg);

                        const cadRoute = '/api/cad_token';
                        const cadUrl = this.host + cadRoute;
                        return this.post(
                            cadUrl,
                            Object.assign(this.cadData, { idorder: idorderdoc })
                        )
                            .pipe(
                                switchMap((resultCAD: any) => {
                                    if (resultCAD && resultCAD.token) {
                                        return from(this.router.navigate(['/' + resultCAD.token]))
                                            .pipe(map(_ => idorderdoc));
                                    } else {
                                        return of(idorderdoc);
                                    }
                                })
                            );
                    } else {
                        return of(0);
                    }
                })
            );
    }

    createOrderdocitemsBySimpleJSON(simpleJSONs: SimpleJSONModel[]): Observable<number[]> {
        const url = `${this.host}${this.urlCreateOrderdocitem()}`;
        return this.post(url, simpleJSONs)
            .pipe(
                switchMap((result: OSCreateOrderdocitemResponse) => {
                    if (result && result.message === 'Successful' && result.idorderdocitem > 0) {
                        return of(result.oknaSpacePositions.map(_ => _.idorderdocitem));
                    } else {
                        return of([0]);
                    }
                })
            );
    }

    updateOrderdocitemsBySimpleJSON(idorderdocitems: number[], simpleJSONs: SimpleJSONModel[]): Observable<number[]> {
        return from(idorderdocitems)
            .pipe(
                mergeMap((idorderdocitem: number) => {
                    return this.deleteOrderdocitem(idorderdocitem);
                }),
                reduce((acc: boolean[], val: boolean) => {
                    acc.push(val);
                    return acc;
                }, [])
            )
            .pipe(
                switchMap((deleteResults: boolean[]) => {
                    let idx = 0;
                    for (const dr of deleteResults) {
                        if (!dr) {
                            simpleJSONs.splice(idx, 1);
                        }
                        idx++;
                    }
                    return this.createOrderdocitemsBySimpleJSON(simpleJSONs);
                })
            );

    }

    deleteOrderdocitem(idorderdocitem: number): Observable<boolean> {
        const url = `${this.host}${this.urlDeleteOrderdocitem(idorderdocitem)}`;
        return this.delete(url)
            .pipe(
                switchMap((result: OSDeleteOrderdocitemResponse) => {
                    if (result && result.message === 'Successful') {
                        return of(true);
                    } else {
                        return of(false);
                    }
                })
            );
    }

    getOrderdocitem(idorderdocitem: number): Observable<OSOrderdocitem> {
        const url = `${this.host}${this.urlLoadOrderdocitem(idorderdocitem)}`;
        return this.get(url)
            .pipe(
                switchMap((result: OSOrderdocitemResponse) => {
                    if (result && result.message === 'Successful' && result.result && result.result.data && result.result.data.length) {
                        return of(result.result.data[0]);
                    } else {
                        return of(null);
                    }
                })
            );
    }

    getOrderdocmodel(idorderdocitem: number): Observable<OSOrderdocmodel> {
        const url = `${this.host}${this.urlLoadOrderdocmodel(idorderdocitem)}`;
        return this.get(url)
            .pipe(
                switchMap((result: OSOrderdocmodelResponse) => {
                    if (result && result.message === 'Successful' && result.result && result.result.data && result.result.data.length) {
                        return of(result.result.data[0]);
                    } else {
                        return of(null);
                    }
                })
            );
    }

    getOrderdocitems(idorderdoc: number, idgoods: number[]): Observable<OSOrderdocitem[]> {
        const url = `${this.host}${this.urlLoadOrderdocitems(idorderdoc)}`;
        return this.get(url)
            .pipe(
                switchMap((result: OSOrderdocitemResponse) => {
                    if (result && result.message === 'Successful' && result.result && result.result.data && result.result.data.length) {
                        return of(result.result.data.filter(_ => idgoods.indexOf(+_.idgood) > -1));
                    } else {
                        return of([]);
                    }
                })
            );
    }

    updateOrderdocitem(orderdocitem: any): Observable<number> {
        const url = `${this.host}${this.urlUpdateOrderdocitem}`;
        const data = { data: [orderdocitem] };
        return this.post(url, data)
            .pipe(
                switchMap((result: OSCreateOrderdocResponse) => {
                    if (result && result.message === 'Successful'
                        && result.result && result.result.length
                        && result.result[0].key_value > 0
                    ) {
                        return of(result.result[0].key_value);
                    } else {
                        return of(0);
                    }
                })
            );
    }

    createAgreementsOnOrderdoc(idorderdoc: number): Observable<number> {
        const url = `${this.host}/api/bp_action/${this.idcustomerdepartment}`;
        const data = {
            actionName: 'СreateAgreementsOnOrderdoc',
            idorderdoc
        };
        return this.post(url, data)
            .pipe(
                switchMap((result: OSCreateAgreementOnOrderdocResponse) => {
                    if (result && result.message === 'Successful'
                        && result.data && result.data.length
                        && result.data[0] > 0
                    ) {
                        return of(result.data[0]);
                    } else {
                        return of(0);
                    }
                })
            );
    }

    showAgreement(idagreement: number) {
        return from(this.router.navigateByUrl(`${this.host}/documents/agreement/edit/${idagreement}`));
    }

    postSign(mark: string, idorderdoc: number, strvalue: string) {
        const data = {
            idorderdoc,
            mark,
            strvalue
        };
        const url = `${this.host}/api/order_mark/`;
        return this.post(url, data)
            .pipe(
                map((result: any) => {
                    if (result) {
                        if (result.success !== null) {
                            return result.success;
                        } else {
                            return false;
                        }
                    } else {
                        console.error('Ошибка метода postEntity, не правильный ответ сервера:');
                        console.error(result);
                        throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                    }
                }),
                catchError(OknaspaceExchangeService.handleError)
            );
    }

    deleteSign(mark: string, idorderdoc: number) {
        const url = `${this.host}/api/order_mark/${idorderdoc}/${mark}`;
        return this.delete(url)
            .pipe(map((data) => {
                return data;
            }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 424 && error.error.result) {
                        // Обрабатываем ошибку удаления из за зависимостей
                        const failedDependency = new FailedDependency(error.error.result as IDependency[]);
                        return throwError(failedDependency);
                    } else {
                        return throwError(error);
                    }
                }),
                catchError(OknaspaceExchangeService.handleError)
            );
    }

    checkSign(mark: string, idorderdoc: number) {
        const url = `${this.host}/api/order_mark/${idorderdoc}/${mark}`;
        return this.get(url)
            .pipe(
                map((data: any) => data.result),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 424 && error.error.result) {
                        // Обрабатываем ошибку удаления из за зависимостей
                        const failedDependency = new FailedDependency(error.error.result as IDependency[]);
                        return throwError(failedDependency);
                    } else {
                        return throwError(error);
                    }
                }),
                catchError(OknaspaceExchangeService.handleError)
            );
    }


    xor(text: string, key: string): string {
        const kL = key.length;

        return Array.prototype
            .slice.call(text)
            .map((c: string, index: number) => {
                // tslint:disable-next-line:no-bitwise
                return String.fromCharCode(c.charCodeAt(0) ^ key[index % kL].charCodeAt(0));
            }).join('');
    }

    restoreSlash(str: string): string {
        return str.split('_').join('/');
    }


    use(token: string) {
        token = this.restoreSlash(token);
        const tokenDecoded = this.xor(Base64.decode(token), 'xor');
        const devidor = '--[{!@#$%}]--';
        const devidorReal = tokenDecoded.indexOf(devidor) > 0 ? devidor : ' ';
        const data = tokenDecoded.split(devidorReal);

        const saveData: ICadData = {
            user: data[0],
            pass: data[1],
            idorder: +data[2],
            host: data[3],
            idcustomerdepartment: data[4],
            language: data[5],
            idlanguage: +data[6],
            accessMode: data[7]
        };

        if (token === 'test') {
            saveData.host = 'https://test.okna.space';
            saveData.idorder = 0;
            saveData.user = 'test';
            saveData.pass = 'test';
            saveData.idcustomerdepartment = '27';
            saveData.accessMode = 'FullAccess';
        }

        if (token === 'demo') {
            saveData.host = 'https://test.okna.space';
            saveData.idorder = 0;
            saveData.user = 'admin_1';
            saveData.pass = 'dbrj50%';
            saveData.idcustomerdepartment = '3';
            saveData.language = 'ru';
            saveData.accessMode = 'FullAccess';
        }

        if (saveData.idcustomerdepartment) {
            this.idcustomerdepartment = saveData.idcustomerdepartment;
        }

        this.host = saveData.host;
        const loginRoute = '/api/login';
        const loginUrl = this.host + loginRoute;

        return this.http.post(
            loginUrl,
            saveData
        )
            .pipe(
                map((result: any) => {
                    if (result && result.token) {
                        this.token = result.token;

                        if (result.user && result.user.idcustomer) {
                            this.idcustomer = result.user.idcustomer.toString();
                        }
                    } else {
                        console.error('Ошибка метода postEntity, не правильный ответ сервера:');
                        console.error(result);
                        // throw new Error(`Ошибка метода postEntity, не правильный ответ сервера: ${result}`);
                    }
                }),
                catchError(OknaspaceExchangeService.handleError)
            ).pipe(
                switchMap(_ => {
                    this.cadData = saveData;
                    this.initialOrderdocId.next(this.cadData.idorder);
                    this.initialOrderdocId.complete();
                    return of(this.cadData);
                })
            );
    }

    bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

}

export interface OSCreateAgreementOnOrderdocResponse {
    message: string;
    data: number[];
}

export interface OSCreateOrderdocResponse {
    message: string;
    result: OSCreateOrderdocResponseResultItem[];
}

export interface OSCreateOrderdocResponseResultItem {
    key_value: number;
}

export interface EmptyBody {
    data: object[];
}

export interface OSCreateOrderdocitemResponse {
    message: string;
    idorderdoc: number;
    idorderdocitem: number;
    idorderdocitemmodel: number;
    idorderdocmodelpic: number;
    template: string;
    idorderdocitems: number;
    idorderdocitemmodels: number;
    idorderdocmodelpics: number;
    oknaSpacePositions: OSCreateOSItmsResult[];
}

export interface OSCreateOSItmsResult {
    idorderdoc: number;
    idorderdocitem: number;
    idorderdocmodel: number;
    idorderdocmodelpic: number;
    templateIdx: number;
    jsonIdx: number;
}

export interface OSDeleteOrderdocitemResponse {
    message: string;
}

export interface OSOrderdocitemResponse {
    message: string;
    result: OSOrderdocitemResponseData;
}

export interface OSOrderdocitemResponseData {
    data: OSOrderdocitem[];
}

export interface OSOrderdocitem {
    weight: number;
    smdiscount: number;
    pic: string;
    furniture: string;
    numpos: number;
    pricewithdiscount: number;
    pricemin: number;
    smwithdiscount: number;
    qupos: number;
    smmax: number;
    lenght: number;
    profile: string;
    color2: string;
    pricemy: number;
    idorderdocitem: number;
    sm: number;
    smmin: number;
    smdiscountmy: number;
    height: number;
    smmy: number;
    comment: string;
    constrtype: string;
    color1: string;
    price: number;
    pricemax: number;
    width: number;
    name: string;
    is_changed: boolean;
    idgood: number;
    good_name: string;
    idsystemprofile: string;
    systemprofile_name: string;
    idorderdoc: number;
    orderdoc_name: string;
    idcustomerkey: number;
    customerkey_name: string;
    good_shortname: string;
    systemprofile_thick: number;
}

export interface OSOrderdocmodelResponse {
    message: string;
    result: OSOrderdocmodelResponseData;
}

export interface OSOrderdocmodelResponseData {
    data: OSOrderdocmodel[];
}

export interface OSOrderdocmodel {
    /***/
    idorderdocmodel: number;
    /** Модель изделия */
    model: string;
    /** Позиция расчета */
    idorderdocitem: number;
    /** Позиция расчета */
    orderdocitem_name: string;
    /** Расчет */
    idorderdoc: number;
    /** Расчет */
    orderdoc_name: string;
    /** Владелец */
    idcustomerkey: number;
    /** Владелец */
    customerkey_name: string;
}


/** Не авторизованный доступ */
export class UnauthorizedAccess {
    /** Конструктор */
    constructor(public message: string) {
    }
}

/** Не найдено */
export class NotFound {
    /** Конструктор */
    constructor(public message: string) {
    }
}
/***/
export interface IDependency {
    key: number;
    entity_name: string;
    entity_comment: string;
    name_entity: string;
}

export class FailedDependency {
    /***/
    constructor(public dependency: IDependency[]) {
    }
}

export interface ICadData {
    user: string;
    pass: string;
    idorder: number;
    host: string;
    idcustomerdepartment: string;
    language: string;
    idlanguage: number;
    accessMode: string;
}


export interface OSOrderdocResponse {
    message: string;
    result: OSOrderdocResponseData;
}

export interface OSOrderdocResponseData {
    data: OSOrderdoc[];
}

export interface OSOrderdoc {
    smmax: string;
    smmin: string;
    smdiscount: string;
    smdocwithdiscount: string;
    address: string;
    location: string;
    phone: string;
    floor: string;
    porch: string;
    flat: string;
    intercom: string;
    smdiscountmy: string;
    dtdoc: string;
    last_update: string;
    comment: string;
    smdoc: string;
    dtcre: string;
    smdocmy: string;
    discount: string;
    contact: string;
    idorderdoc: string;
    name: string;
    idcustomercre: string;
    customercre_name: string;
    idcustomerresp: string;
    customerresp_name: string;
    idsizedoc: string;
    sizedoc_name: string;
    idorderdocstatus: string;
    orderdocstatus_name: string;
    idcustomerdepartment: string;
    customerdepartment_name: string;
    idcustomer: string;
    customer_name: string;
    idcustomerkey: string;
    customerkey_name: string;
    idappeal: string;
    appeal_name: string;
    idorderdocgroup: string;
    orderdocgroup_name: string;
    idvalut: string;
    valut_name: string;
    orderdocstatus_cssclass: string;
    customer_phone: string;
    customer_customercode: string;
    valut_code: string;
}