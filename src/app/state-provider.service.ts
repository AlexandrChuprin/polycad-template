import { Polycad, PolycadConstruction, PolycadFill, PolycadTemplateGenerator, Settings, SimpleXMLExporter, ViewModel, WindowTemplates } from '@a.chuprin/polycad-core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { first, map, mergeMap, switchMap } from 'rxjs/operators';
import { SetError, SetIdorderdoc, SetIdorderdocitem, SetPolycadValut } from './actions/actions';
import { StoreAction } from './actions/store-action';
import { SettingsPolycad } from './classes/settings/setings-polycad';
import { PolycadValut } from './classes/settings/settings';
import { State } from './classes/state';
import { OpenType, SimpleJSONFill, SimpleJSONModel } from './interfaces/simple-json';
import { OknaspaceExchangeService, OSOrderdoc, OSOrderdocitem } from './oknaspace-exchange.service';

@Injectable({
  providedIn: 'root'
})
export class StateProviderService {
  static valutMap = new Map([
    [969, 'MGA'],
    [971, 'AFN'],
    [590, 'PAB'],
    [764, 'THB'],
    [937, 'VEF'],
    [68, 'BOB'],
    [230, 'ETB'],
    [548, 'VUV'],
    [408, 'KPW'],
    [410, 'KRW'],
    [980, 'UAH'],
    [600, 'PYG'],
    [532, 'ANG'],
    [332, 'HTG'],
    [270, 'GMD'],
    [807, 'MKD'],
    [12, 'DZD'],
    [48, 'BHD'],
    [400, 'JOD'],
    [368, 'IQD'],
    [414, 'KWD'],
    [434, 'LYD'],
    [941, 'RSD'],
    [788, 'TND'],
    [504, 'MAD'],
    [784, 'AED'],
    [678, 'STD'],
    [36, 'AUD'],
    [44, 'BSD'],
    [52, 'BBD'],
    [84, 'BZD'],
    [60, 'BMD'],
    [96, 'BND'],
    [951, 'XCD'],
    [328, 'GYD'],
    [344, 'HKD'],
    [932, 'ZWD'],
    [136, 'KYD'],
    [124, 'CAD'],
    [430, 'LRD'],
    [516, 'NAD'],
    [554, 'NZD'],
    [702, 'SGD'],
    [90, 'SBD'],
    [840, 'USD'],
    [968, 'SRD'],
    [901, 'TWD'],
    [780, 'TTD'],
    [242, 'FJD'],
    [388, 'JMD'],
    [704, 'VND'],
    [51, 'AMD'],
    [978, 'EUR'],
    [985, 'PLN'],
    [392, 'JPY'],
    [973, 'AOA'],
    [894, 'ZMK'],
    [454, 'MWK'],
    [320, 'GTQ'],
    [598, 'PGK'],
    [418, 'LAK'],
    [188, 'CRC'],
    [558, 'NIO'],
    [208, 'DKK'],
    [352, 'ISK'],
    [578, 'NOK'],
    [933, 'BYN'],
    [203, 'CZK'],
    [752, 'SEK'],
    [191, 'HRK'],
    [104, 'MMK'],
    [981, 'GEL'],
    [428, 'LVL'],
    [975, 'BGN'],
    [498, 'MDL'],
    [946, 'RON'],
    [8, 'ALL'],
    [340, 'HNL'],
    [694, 'SLL'],
    [748, 'SZL'],
    [949, 'TRY'],
    [440, 'LTL'],
    [426, 'LSL'],
    [944, 'AZN'],
    [934, 'TMТ'],
    [977, 'BAM'],
    [943, 'MZN'],
    [566, 'NGN'],
    [232, 'ERN'],
    [64, 'BTN'],
    [776, 'TOP'],
    [446, 'MOP'],
    [32, 'ARS'],
    [214, 'DOP'],
    [170, 'COP'],
    [192, 'CUP'],
    [484, 'MXN'],
    [858, 'UYU'],
    [608, 'PHP'],
    [152, 'CLP'],
    [72, 'BWP'],
    [986, 'BRL'],
    [364, 'IRR'],
    [886, 'YER'],
    [634, 'QAR'],
    [512, 'OMR'],
    [116, 'KHR'],
    [458, 'MYR'],
    [682, 'SAR'],
    [974, 'BYR'],
    [643, 'RUB'],
    [356, 'INR'],
    [360, 'IDR'],
    [480, 'MUR'],
    [524, 'NPR'],
    [586, 'PKR'],
    [690, 'SCR'],
    [144, 'LKR'],
    [462, 'MVR'],
    [710, 'ZAR'],
    [936, 'GHS'],
    [604, 'PEN'],
    [417, 'KGS'],
    [972, 'TJS'],
    [860, 'UZS'],
    [50, 'BDT'],
    [882, 'WST'],
    [398, 'KZT'],
    [496, 'MNT'],
    [478, 'MRO'],
    [533, 'AWG'],
    [348, 'HUF'],
    [108, 'BIF'],
    [324, 'GNF'],
    [262, 'DJF'],
    [174, 'KMF'],
    [976, 'CDF'],
    [646, 'RWF'],
    [756, 'CHF'],
    [953, 'XPF'],
    [952, 'XOF'],
    [950, 'XAF'],
    [826, 'GBP'],
    [292, 'GIP'],
    [818, 'EGP'],
    [422, 'LBP'],
    [654, 'SHP'],
    [760, 'SYP'],
    [938, 'SDG'],
    [238, 'FKP'],
    [376, 'ILS'],
    [404, 'KES'],
    [706, 'SOS'],
    [834, 'TZS'],
    [800, 'UGX'],
    [132, 'CVE'],
    [156, 'CNY'],
    [643, 'RUR']
  ]);
  static getValutByCode(code: number) {
    if (code && this.valutMap.has(code)) {
      return this.valutMap.get(code);
    }
  }
  private idorderdoc = 0;
  private accessMode = 'FullAccess';
  public isReadOnly = false;
  public isSettingsLoadedFromOS = false;
  public isSettingsLoadedFromOSWithError = false;
  public settingsLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  state: BehaviorSubject<State> = new BehaviorSubject(null);
  lastState: State = new State();
  polycad: Polycad = null;
  constructor(public oknaspaceExchangeService: OknaspaceExchangeService) {
    this.subscribeOnSettingsLoaded();
  }

  getImage(state: State) {
    if (this.polycad && this.polycad.model
      && this.polycad.model.template && this.polycad.model.template.installOptions) {
      this.polycad.controller.last_template = +state.simpleJSON.template;
      const pic = this.polycad.getBase64Svg({ show_back: 0, draw_sizes: 1 });
      return pic;
    } else {
      return '';
    }
  }

  next(state: State) {

    state.polycad = null;
    this.lastState = JSON.parse(JSON.stringify(state));
    state = this.createPolycad(state);
    this.polycad = state.polycad;
    state.simpleJSON.pic = this.getImage(state);
    const isMobile = window.innerWidth < 575;
    state.mobile = isMobile;
    this.state.next(state);
  }

  updatePage(page: string) {
    if (page && page.length && this.lastState.pages.indexOf(page) > -1) {
      this.lastState.page = page;
      this.next(this.lastState);
    }
  }

  process(action: StoreAction) {
    // this.next(action.perform(this.lastState));
    this.next(action.perform(this.lastState));
  }

  createPolycad(state: State): State {
    const stateUpdated = state;
    const templateDefault = SettingsPolycad.templates.find(_ => _.id.replace('template-', '') === stateUpdated.simpleJSON.idtemplate);
    if (templateDefault) {
      const template = this.fillTemplateFromSimpleJSON(templateDefault, stateUpdated.simpleJSON);
      template.isModelChanged = true;
      const pageStub = { document: null, window: null };
      const polycad: Polycad = new Polycad(pageStub, '', false);
      polycad.settings = SettingsPolycad.settings;
      polycad.exporter = new SimpleXMLExporter(polycad.settings);
      template.installOptions.interior_id = 1;
      polycad.model = new ViewModel(template, polycad.settings);
      polycad.model.setModel(template);
      polycad.model.width = stateUpdated.simpleJSON.width + stateUpdated.simpleJSON.width_door;
      polycad.model.height = +stateUpdated.simpleJSON.height_door > +stateUpdated.simpleJSON.height
        ? +stateUpdated.simpleJSON.height_door
        : +stateUpdated.simpleJSON.height;

      stateUpdated.polycad = polycad;
    }
    return stateUpdated;
  }

  fillTemplateFromSimpleJSON(template: PolycadConstruction, simpleJSON: SimpleJSONModel): PolycadConstruction {
    const templateUpdated = JSON.parse(JSON.stringify(template)) as PolycadConstruction;
    const window = templateUpdated.models.filter(_ => _.type === 'window')[0];
    const door = templateUpdated.models.filter(_ => _.type === 'door')[0];

    if (window) {
      window.width = simpleJSON.width;
      window.height = simpleJSON.height;

      let c = 0;
      simpleJSON.fields.forEach(f => {
        window.fills[c].open_type = f.open_type;
        window.fills[c].marking = simpleJSON.glass;
        c++;
      });

      window.imp_poses = [...simpleJSON.imposts];
    }

    if (door) {
      door.width = simpleJSON.width_door;
      door.height = simpleJSON.height_door;

      let c = 0;
      simpleJSON.fields_door.forEach(f => {
        door.fills[c].open_type = f.open_type;
        door.fills[c].marking = simpleJSON.glass;
        c++;
      });

      door.imp_poses = [...simpleJSON.imposts_door];
      door.door_imp_poses = [...simpleJSON.imposts_door];
    }

    templateUpdated.models.forEach(m => m.profile_system = simpleJSON.profile);
    templateUpdated.models.forEach(m => m.furniture_system = simpleJSON.furniture);
    templateUpdated.models.forEach(m => m.fill_marking = simpleJSON.glass);
    templateUpdated.models.forEach(m => m.front_color = simpleJSON.color_out);
    templateUpdated.models.forEach(m => m.color_outside_marking = simpleJSON.color_out);
    templateUpdated.models.forEach(m => m.back_color = simpleJSON.color_in);
    templateUpdated.models.forEach(m => m.color_inside_marking = simpleJSON.color_in);

    return templateUpdated;
  }

  loadPolycadSettings(token: string) {
    this.oknaspaceExchangeService.use(token)
      .subscribe(
        (cadData) => {
          this.accessMode = cadData.accessMode;
          this.isReadOnly = this.accessMode === 'ReadOnly';
        },
        (error) => {
          console.error(error);
          this.oknaspaceExchangeService.error.next(JSON.stringify(error));
          this.oknaspaceExchangeService.error.complete();
        }

      );
  }

  private subscribeOnSettingsLoaded() {
    // this.showSpinner();
    this.oknaspaceExchangeService.initialOrderdocId
      .subscribe(idorderdoc => {
        this.isSettingsLoadedFromOSWithError = false;
        if (this.oknaspaceExchangeService.idcustomerdepartment) {
          this.oknaspaceExchangeService
            .loadPolycadSettingsFromOS(this.oknaspaceExchangeService.idcustomerdepartment)
            .pipe(
              switchMap(settings => {
                return this.oknaspaceExchangeService
                  .loadPolycadLocalizationFromOS()
                  .pipe(
                    switchMap((loc: any) => {
                      const lang = {};
                      if (loc && loc.result && loc.result.data && loc.result.data.length) {
                        loc.result.data.forEach(element => {
                          lang[element.code] = element.name;
                        });
                      }
                      return of([settings, lang]);
                    })
                  );
              })
            )
            .subscribe((data: any[]) => {
              const settings = data[0];
              const lang = data[1];
              // this.hideSpinner();
              if (settings) {
                const settingsPolycad = JSON.parse(settings);
                this.oknaspaceExchangeService.
                  loadIdgoodsPolycadFromOS()
                  .subscribe(
                    (idgoodsdata: any) => {
                      if (idgoodsdata && idgoodsdata.idgoods && idgoodsdata.idgoods.length) {
                        settingsPolycad['idgoods'] = [...idgoodsdata.idgoods];
                      }
                      this.processLoadedSettings(settingsPolycad, idorderdoc, lang);
                    },
                    (error) => {
                      this.processLoadedSettings(settingsPolycad, idorderdoc, lang);
                    }
                  );
              } else {
                this.isSettingsLoadedFromOSWithError = true;
              }

            }, (error) => {
              this.isSettingsLoadedFromOSWithError = true;
              // this.hideSpinner();
              console.log('settings load result: Error');
              let message = '';
              if (error && error.message) {
                message = error.message;
              }
              if (error && error.error && error.error.message) {
                message = error.error.message;
              }
              console.log(message);
              if (this.lastState) {
                this.lastState.error = message;
                this.process(new SetError(message));
              }
              this.settingsLoadedSubject.next(false);
            });
        }

      }, (error) => {
        this.isSettingsLoadedFromOSWithError = true;
        // this.hideSpinner();
        console.log('settings load result: Error');
        let message = '';
        if (error && error.message) {
          message = error.message;
        }
        if (error && error.error && error.error.message) {
          message = error.error.message;
        }
        console.log(message);
        if (this.lastState) {
          this.lastState.error = message;
          this.process(new SetError(message));
        }
      });
  }

  public installValut(settingsPolycad: any, valut_code: string) {
    if (this.lastState && valut_code) {
      const valut = StateProviderService.getValutByCode(+valut_code) as PolycadValut;
      if (valut) {
        this.lastState.settings.polycadValut = valut;
        this.process(new SetPolycadValut(valut));
      }
    }
  }
  private processLoadedSettings(settingsPolycad: any, idorderdoc: number, lang: any) {
    // this.setState(new State());
    this.isSettingsLoadedFromOS = true;

    if (this.lastState) {
      settingsPolycad['lang'] = lang;
      this.lastState.applySettings(settingsPolycad);
      this.process(new SetError(''));
    }
    if (idorderdoc) {
      this.idorderdoc = idorderdoc;
      this.process(new SetIdorderdoc(idorderdoc));
      // Загрузим все позиции заказа с idgood === polycad
      // this.loadOrderdocFromToken();
    }
    this.settingsLoadedSubject.next(true);
  }

  createOrderdoc() {
    return this.oknaspaceExchangeService.createOrderdoc()
    .pipe(map((idorderdoc: number) => {
      this.process(new SetIdorderdoc(idorderdoc));
      return idorderdoc;
    }));
  }

  addOrderdocitemsObservable() {
    if (!this.idorderdoc) {
      return this.createOrderdoc()
        .pipe(
          switchMap((idorder: number) => {
            return this.oknaspaceExchangeService.getOrderdoc(idorder)
              .pipe(
                switchMap((order: OSOrderdoc) => {
                  if (order && order.valut_code) {
                    this.installValut(this.lastState.settings, order.valut_code);
                  }
                  return of(idorder);
                })
              );
          }),
          switchMap((idorderdoc: number) => {
            this.idorderdoc = idorderdoc;
            console.log('Создан расчет №' + idorderdoc);
            return this.addOrUpdateOrderdocitemsBySimpleJSON();
          })
        );
    } else {
      return this.addOrUpdateOrderdocitemsBySimpleJSON();
    }
  }

  private addOrUpdateOrderdocitemsBySimpleJSON(): Observable<number[]> {
    if (this.idorderdoc > 0) {
      return this.createOrUpdateOrderdocitemsBySimpleJSON();
    } else {
      return of([]);
    }
  }

  private createOrUpdateOrderdocitemsBySimpleJSON() {
    const simpleJSONs: SimpleJSONModel[] = this.getSimpleJSONS(this.lastState);
    return this.oknaspaceExchangeService.createOrderdocitemsBySimpleJSON(simpleJSONs)
      .pipe(
        switchMap((idorderdocitems: number[]) => {
          console.log('Созданы позиции расчета №' + simpleJSONs[0].idorderdoc + ', :' + idorderdocitems.join('; '));
          return of(idorderdocitems);
        })
      );
  }

  getSimpleJSONS(state: State): SimpleJSONModel[] {
    const models: SimpleJSONModel[] = [];
    state.settings.products.filter(_ => _.isAvailable)
      .forEach(product => {
        product.idoptions.forEach(o => {
          const option = product.options.find(_ => _.id === o.idoption);
          if (option) {
            o.checked = option.checked;
          }
        });
        const simpleJSON: SimpleJSONModel = state.simpleJSON;
        if (simpleJSON) {
          simpleJSON.idorderdocitem = +product.idorderdocitemFake;
          models.push(simpleJSON);
        }
      });
    return models;
  }


  getOrderdocitem(idorderdocitem: number): Observable<OSOrderdocitem> {
    return this.oknaspaceExchangeService.getOrderdocitem(idorderdocitem);
  }
  loadCalcedOrderdocitems(state: State) {
    return this.getOrderdocitem(state.idorderdocitem)
      .subscribe((orderdocitem: OSOrderdocitem) => {
        this.process(new SetIdorderdocitem(orderdocitem.idorderdocitem));
      })
  }

  checkOrderCalced() {
    interval(1000 * 2)
      .pipe(
        mergeMap(() => this.getOrderMark('orderCalced')),
        first(data => {
          // console.log(`first data = ${data}`);
          return data === true;
        })
      )
      .subscribe(result => {
        console.log(`sign finded: orderCalced`);
        console.log(result);
        this.loadCalcedOrderdocitems(this.lastState);
      });
  }
  getOrderMark(mark: string) {
    return this.oknaspaceExchangeService.checkSign(mark, this.idorderdoc)
      .pipe(
        switchMap(result => {
          return of(result);
        })
      );
  }
}
