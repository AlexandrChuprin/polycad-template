import { ViewGraphics, DrawOptions, Drawer, PolycadFill } from '@a.chuprin/polycad-core';
import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SelectTemplate, SetCalculationStatus, SetDoorFills, SetDoorHeight, SetDoorImpPositions, SetDoorWidth, SetError, SetMobile, SetTitleAndComment, SetWindowFills, SetWindowHeight, SetWindowImpPositions, SetWindowWidth } from '../actions/actions';
import { StoreAction } from '../actions/store-action';
import { State } from '../classes/state';
import { CommonComponent } from '../common/common.component';
import { getOpenTypeDescription, OpenType, Template } from '../interfaces/simple-json';
import { StateProviderService } from '../state-provider.service';

@Component({
  selector: 'app-constrtype',
  templateUrl: './constrtype.component.html',
  styleUrls: ['./constrtype.component.scss']
})

export class ConstrtypeComponent extends CommonComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('containerSVG', { static: true }) containerSVG;
  @ViewChild('containerSVGTemp', { static: true }) containerSVGTemp;
  templates = [1, 2, 3, 21, 4, 6, 5, 7];
  modelIdxLast = 0;
  selectedSize = 0;
  cursorX = 0;
  cursorY = 0;
  lastCursorX = 0;
  lastCursorY = 0;
  state: State;
  subscriptionMousemove: Subscription;
  subscriptionMouseclick: Subscription;
  subscriptionStateProviderService: Subscription;
  isSizeInputVisible = false;
  lastIdSizeline: string;
  timer = null;

  viewGraphics: ViewGraphics;
  drawOptions: DrawOptions;
  private drawerWidth = 370;
  private skeepDrawing = true;
  title = 'Конструктив';
  comment = 'выберите тип конструкции';
  lastPic: SafeResourceUrl = '';

  constrtypes_: ICT[] = [];
  get constrtypes() {
    const data = [];
    this.constrtypes_.forEach(ct => {
      data.push({
        viewBox: ct.viewBox,
        width: ct.width,
        name: ct.name,
        svg: this.sanitizer.bypassSecurityTrustHtml(ct.svg),
        idtemplate: ct.idtemplate
      })
    });
    return data;
  }

  get openTypes() {
    let openTypesResult = [
      ...this.state.simpleJSON.fields.map(_ => _.open_type),
      ...this.state.simpleJSON.fields_door.map(_ => _.open_type)
    ];
    const doorFirst = [4, 5];
    if (doorFirst.indexOf(+this.state.simpleJSON.idtemplate) > -1) {
      openTypesResult = [
        ...this.state.simpleJSON.fields_door.map(_ => _.open_type),
        ...this.state.simpleJSON.fields.map(_ => _.open_type)
      ];
    }
    return openTypesResult;
  }

  get image() {
    if (this.state && this.state.simpleJSON && this.state.simpleJSON.pic) {
      return this.sanitizer.bypassSecurityTrustUrl(this.state.simpleJSON.pic);
    } else {
      return null;
    }
  }

  constructor(public stateProvider: StateProviderService, private sanitizer: DomSanitizer) {
    super(stateProvider);
          
    this.constrtypes_ = [
      {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-580, -200)" d="M580 230L580 200L604 200L604 230L580 230ZM582.06 228L601.94 228L601.94 202L582.06 202L582.06 228Z"></path>', name: 'Окно', idtemplate: '1'},
      {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-580, -254)" d="M580 284L580 255L604 255L604 284L580 284ZM593.03 282.07L601.94 282.07L601.94 256.93L593.03 256.93L593.03 282.07ZM582.06 282.07L590.97 282.07L590.97 256.93L582.06 256.93L582.06 282.07Z"></path>', name: 'Окно с импостом', idtemplate: '2'},
      {viewBox: '0 0 34 34', width: 34, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-575, -309)" d="M575 339L575 309L609 309L609 339L575 339ZM598.33 337L607 337L607 311L598.33 311L598.33 337ZM596.33 337L596.33 311L587.67 311L587.67 337L596.33 337ZM577 337L585.67 337L585.67 311L577 311L577 337Z"></path>', name: 'Окно с импостами', idtemplate: '3'},
      {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-584, -364)" d="M584 394L584 364L600 364L600 394L584 394ZM585.92 392L598.08 392L598.08 386.33L585.92 386.33L585.92 392ZM598.08 385L598.08 366L585.92 366L585.92 385L598.08 385Z"></path>', name: 'Дверь с импостом', idtemplate: '21'},
      {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -419)" d="M578 449L578 419L606 419L606 437L590.81 437L590.81 449L578 449ZM580.03 447L588.78 447L588.78 441.33L580.03 441.33L580.03 447ZM588.78 440L588.78 421L580.03 421L580.03 440L588.78 440ZM604.62 435.67L604.62 420.33L590.81 420.33L590.81 435.67L604.62 435.67Z"></path>', name: 'Балконный блок левый', idtemplate: '4'},
      {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -474)" d="M593.18 504L593.18 492L578 492L578 474L606 474L606 504L593.18 504ZM603.98 496.33L595.2 496.33L595.2 502L603.98 502L603.98 496.33ZM603.98 495L603.98 476L595.2 476L595.2 495L603.98 495ZM593.18 490.67L593.18 475.33L579.35 475.33L579.35 490.67L593.18 490.67Z"></path>', name: 'Балконный блок правый', idtemplate: '6'},
      {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -529)" d="M578 559L578 529L606 529L606 530.33L606 530.33L606 545.67L606 545.67L606 547L590.82 547L590.82 559L578 559ZM580.02 557L588.79 557L588.79 551.33L580.02 551.33L580.02 557ZM588.79 550L588.79 531L580.02 531L580.02 550L588.79 550ZM604.65 545.67L604.65 530.33L598.91 530.33L598.91 545.67L604.65 545.67ZM597.56 545.67L597.56 530.33L590.82 530.33L590.82 545.67L597.56 545.67Z"></path>', name: 'Балконный блок левый с импостом', idtemplate: '5'},
      {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -584)" d="M593.18 614L593.18 602L578 602L578 600.67L578 600.67L578 585.33L578 585.33L578 584L606 584L606 614L593.18 614ZM603.98 606.33L595.2 606.33L595.2 612L603.98 612L603.98 606.33ZM603.98 605L603.98 586L595.2 586L595.2 605L603.98 605ZM585.09 600.67L585.09 585.33L579.35 585.33L579.35 600.67L585.09 600.67ZM593.18 600.67L593.18 585.33L586.43 585.33L586.43 600.67L593.18 600.67Z"></path>', name: 'Балконный блок правый с импостом', idtemplate: '7'}
    ];

    this.changeTemplate(0, 1);
  }

  changeTemplate(idx: number, idtemplate: number) {
    console.log('changeTemplate, idx = ', idx);
    this.constrtypes_.forEach(_ => _.svg = _.svg.replace('shp5', 'shp11'));
    this.constrtypes_[idx].svg = this.constrtypes_[idx].svg.replace('shp11', 'shp5');
    const template = this.templates[idx] as Template;
    this.process(new SelectTemplate(template));
  }

  setOpenType(fillIdx: number, value: OpenType) {
    const doorFirst = [4, 5, 20, 21];
    if (doorFirst.indexOf(+this.state.simpleJSON.idtemplate) > -1) {
      if (fillIdx === 0) {
        this.setOpenTypeDoor(fillIdx, value);
      } else {
        this.setOpenTypeWindow(fillIdx - 1, value);
      }
    } else {
      if (+this.state.simpleJSON.idtemplate == 6 && fillIdx === 1) {
        this.setOpenTypeDoor(0, value);
      } else if (+this.state.simpleJSON.idtemplate == 7 && fillIdx === 2) {
        this.setOpenTypeDoor(0, value);
      } else {
        this.setOpenTypeWindow(fillIdx, value);
      }
    }
  }

  setOpenTypeWindow(fillIdx: number, value: OpenType) {
    console.log('setOpenTypeWindow_' + fillIdx);
    console.log(value);
    const fills = this.state.simpleJSON.fields;
    fills[fillIdx].open_type = value;
    this.process(new SetWindowFills(fills));
  }

  setOpenTypeDoor(fillIdx: number, value: OpenType) {
    console.log('setOpenTypeDoor_');
    console.log(value);
    const fills = this.state.simpleJSON.fields_door;
    fills[0].open_type = value;
    this.process(new SetDoorFills(fills));
  }

  openTypeDescription(opentype: OpenType) {
    return getOpenTypeDescription(opentype);
  }

  ngOnInit() {
    this.stateProvider.process(new SetTitleAndComment(this.title, this.comment));
    this.subscriptionStateProviderService = this.stateProvider.state
    .subscribe(construction => {
      this.isSizeInputVisible = false;
      this.state = construction;


        try {
          
          this.constrtypes_ = [
            {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-580, -200)" d="M580 230L580 200L604 200L604 230L580 230ZM582.06 228L601.94 228L601.94 202L582.06 202L582.06 228Z"></path>', name: 'Окно', idtemplate: '1'},
            {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-580, -254)" d="M580 284L580 255L604 255L604 284L580 284ZM593.03 282.07L601.94 282.07L601.94 256.93L593.03 256.93L593.03 282.07ZM582.06 282.07L590.97 282.07L590.97 256.93L582.06 256.93L582.06 282.07Z"></path>', name: 'Окно с импостом', idtemplate: '2'},
            {viewBox: '0 0 34 34', width: 34, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-575, -309)" d="M575 339L575 309L609 309L609 339L575 339ZM598.33 337L607 337L607 311L598.33 311L598.33 337ZM596.33 337L596.33 311L587.67 311L587.67 337L596.33 337ZM577 337L585.67 337L585.67 311L577 311L577 337Z"></path>', name: 'Окно с импостами', idtemplate: '3'},
            {viewBox: '0 0 24 34', width: 20, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-584, -364)" d="M584 394L584 364L600 364L600 394L584 394ZM585.92 392L598.08 392L598.08 386.33L585.92 386.33L585.92 392ZM598.08 385L598.08 366L585.92 366L585.92 385L598.08 385Z"></path>', name: 'Дверь с импостом', idtemplate: '21'},
            {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -419)" d="M578 449L578 419L606 419L606 437L590.81 437L590.81 449L578 449ZM580.03 447L588.78 447L588.78 441.33L580.03 441.33L580.03 447ZM588.78 440L588.78 421L580.03 421L580.03 440L588.78 440ZM604.62 435.67L604.62 420.33L590.81 420.33L590.81 435.67L604.62 435.67Z"></path>', name: 'Балконный блок левый', idtemplate: '4'},
            {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -474)" d="M593.18 504L593.18 492L578 492L578 474L606 474L606 504L593.18 504ZM603.98 496.33L595.2 496.33L595.2 502L603.98 502L603.98 496.33ZM603.98 495L603.98 476L595.2 476L595.2 495L603.98 495ZM593.18 490.67L593.18 475.33L579.35 475.33L579.35 490.67L593.18 490.67Z"></path>', name: 'Балконный блок правый', idtemplate: '6'},
            {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -529)" d="M578 559L578 529L606 529L606 530.33L606 530.33L606 545.67L606 545.67L606 547L590.82 547L590.82 559L578 559ZM580.02 557L588.79 557L588.79 551.33L580.02 551.33L580.02 557ZM588.79 550L588.79 531L580.02 531L580.02 550L588.79 550ZM604.65 545.67L604.65 530.33L598.91 530.33L598.91 545.67L604.65 545.67ZM597.56 545.67L597.56 530.33L590.82 530.33L590.82 545.67L597.56 545.67Z"></path>', name: 'Балконный блок левый с импостом', idtemplate: '5'},
            {viewBox: '0 0 32 34', width: 30, svg: '<path fill-rule="evenodd" class="shp11" transform="translate(-578, -584)" d="M593.18 614L593.18 602L578 602L578 600.67L578 600.67L578 585.33L578 585.33L578 584L606 584L606 614L593.18 614ZM603.98 606.33L595.2 606.33L595.2 612L603.98 612L603.98 606.33ZM603.98 605L603.98 586L595.2 586L595.2 605L603.98 605ZM585.09 600.67L585.09 585.33L579.35 585.33L579.35 600.67L585.09 600.67ZM593.18 600.67L593.18 585.33L586.43 585.33L586.43 600.67L593.18 600.67Z"></path>', name: 'Балконный блок правый с импостом', idtemplate: '7'}
          ];

          this.constrtypes_ = this.constrtypes_.filter(ct => {
            const prodtype = this.state.settings.prodtypes.find(pt => pt.idtemplate == ct.idtemplate);
            return prodtype !== undefined;
          });

          this.templates = this.templates.filter(t => {
            const prodtype = this.state.settings.prodtypes.find(pt => pt.idtemplate == t+'');
            return prodtype !== undefined;
          });

          this.drawOptions = new DrawOptions(false, true);
          this.viewGraphics = new ViewGraphics('',
            this.rollFill.bind(this),
            null, // this.rollMoskit.bind(this),
            null, // this.setEditableImpost.bind(this),
            this.getCurrentModelIdx.bind(this),
            this.setCurrentModelIdx.bind(this),
            this.selectSizeline.bind(this)
          );
          this.state.polycad.controller.curModelIdx = this.modelIdxLast;
          this.drawPolycadModel();
          
        } catch (exception) {
          // this.state.error = JSON.stringify(exception);
        }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionStateProviderService) {
      this.subscriptionStateProviderService.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    if (this.containerSVG && this.containerSVGTemp) {
      if (window && window.screen && window.screen.width) {
        const screenWidth = window.screen.width;
        if (screenWidth < 600) {
          this.drawerWidth = 300;
        }
      }

        this.viewGraphics = new ViewGraphics('',
          this.rollFill.bind(this),
          null, // this.rollMoskit.bind(this),
          null, // this.setEditableImpost.bind(this),
          this.getCurrentModelIdx.bind(this),
          this.setCurrentModelIdx.bind(this),
          this.selectSizeline.bind(this)
        );
        this.drawOptions = new DrawOptions(false, true);
        Drawer.usedFromIphone = !!window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
        Drawer.initWithSizes(this.drawerWidth, this.drawerWidth, this.containerSVG.nativeElement, this.containerSVGTemp.nativeElement);
        this.skeepDrawing = false;
        try {
          this.drawPolycadModel();
        } catch (exception) {
          console.log(exception);
          const error = JSON.stringify(exception);
          this.process(new SetError(error))
        }


    }
  }

  process(action: StoreAction) {
    if (this.state && this.state.polycad && this.state.polycad.controller) {
      this.modelIdxLast = this.state.polycad.controller.curModelIdx;
    }
    this.stateProvider.process(action);
  }

  updateModel() {
    
  }

  setCurrentModelIdx(idx: number) {

    console.log('setCurrentModelIdx: any, idx = ', idx);
    this.state.polycad.controller.curModelIdx = idx;
    this.drawPolycadModel();
    this.setEditableImpost(-1);
  }

  getCurrentModelIdx(): number {
    const modelIdx = this.state.polycad.controller.curModelIdx;
    return modelIdx;
  }


  selectSizeline(idSizeline: string) {
    if (this.isSizeInputVisible) {
      return;
    }
    this.isSizeInputVisible = false;
    this.updateModel();

    setTimeout(() => {
      console.log(`Меняем размер: ${idSizeline}`);
      this.selectedSize = +idSizeline.split('|')[0];
      this.lastIdSizeline = idSizeline;
      this.cursorX = window.innerWidth / 2;
      this.cursorY = window.innerHeight / 2 + window.scrollY;
      this.lastCursorX = this.cursorX - 100;
      this.lastCursorY = this.cursorY - 140;
      this.isSizeInputVisible = true;
    }, 50);
  }

  changeSize(value: number) {
    this.skeepDrawing = true;

    let operator = this.getPipeByState();
    operator.pipe(
      switchMap((result: boolean) => {
        console.log(result);
        try {
          const idSizeline = this.lastIdSizeline;
          const isGabaritSize = idSizeline.includes('gabarit');
          const isModelSize = idSizeline.includes('model');
          const isImpostSize = idSizeline.includes('impost');
          const isXSize = idSizeline.includes('x');
          const isYSize = idSizeline.includes('y');

          const arr = idSizeline.split('|');
          const modelIdx = +arr[3];
          if (isGabaritSize) {
            console.log(`isGabaritSize`);
            if (isXSize) {
              console.log(`isXSize`);
              const dx = +value / this.state.polycad.model.template.models.length;
              let idx = -1;
              this.state.polycad.model.template.models.forEach(_ => {
                idx++;
                _.width = +dx;
                if (this.state.polycad.model.template.models[idx].type === 'window') {
                  this.process(new SetWindowWidth(+dx));
                } else {
                  this.process(new SetDoorWidth(+dx));
                }
                this.setImpsEvenly(_.width, idx);
              });
            }
            if (isYSize) {
              console.log(`isYSize`);
              // Меняем у модели с наибольшей высотой
              let idx = -1;
              let idxMaxHeightModel = 0;
              let maxH = 0;
              this.state.polycad.model.template.models.forEach(_ => {
                idx++;
                if (_.height > maxH) {
                  maxH = _.height;
                  idxMaxHeightModel = idx;
                }
              });
              // this.state.polycad.model.template.models[idxMaxHeightModel].height = +value;

              if (this.state.polycad.model.template.models[idxMaxHeightModel].type === 'window') {
                this.process(new SetWindowHeight(+value));
              } else {
                this.process(new SetDoorHeight(+value));
              }
            }
          } else if (isModelSize) {
            console.log(`isModelSize`);
            if (isXSize) {
              console.log(`isXSize`);
              // this.state.polycad.model.template.models[modelIdx].width = +value;
              if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
                this.process(new SetWindowWidth(+value));
              } else {
                this.process(new SetDoorWidth(+value));
              }
              this.setImpsEvenly(+value, modelIdx);
            }
            if (isYSize) {
              console.log(`isYSize`);
              // this.state.polycad.model.template.models[modelIdx].height = +value;
              if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
                this.process(new SetWindowHeight(+value));
              } else {
                this.process(new SetDoorHeight(+value));
              }
            }
          } else if (isImpostSize) {
            console.log(`isImpostSize`);
            let impostIdx = +arr[4];
            console.log(`impostIdx: ${impostIdx}`);
            if (isXSize) {
              console.log(`isXSize`);
              if (this.state.polycad.model.template.models[modelIdx].imp_poses.length > impostIdx) {
                this.state.polycad.model.template.editable_impost = impostIdx;
                this.state.polycad.model.template.models[modelIdx].imp_poses[impostIdx] = +value;
                const imps = [...this.state.polycad.model.template.models[modelIdx].imp_poses];
                if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
                  this.process(new SetWindowImpPositions(imps));
                } else {
                  this.process(new SetDoorImpPositions(imps));
                }
              } else {
                impostIdx = this.state.polycad.model.template.models[modelIdx].imp_poses.length - 1;
                this.state.polycad.model.template.editable_impost = impostIdx;
                const w = this.state.polycad.model.template.models[modelIdx].width;
                this.state.polycad.model.template.models[modelIdx].imp_poses[impostIdx] = w - (+value);
                const imps = [...this.state.polycad.model.template.models[modelIdx].imp_poses];
                if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
                  this.process(new SetWindowImpPositions(imps));
                } else {
                  this.process(new SetDoorImpPositions(imps));
                }
              }
            }
          }
        } catch (exception) {
          // this.state.error = JSON.stringify(exception);
        } finally {
          this.skeepDrawing = false;
          this.isSizeInputVisible = false;
          this.updateModel();
        }
        return of(result);
      })
    ).subscribe();
  }

  private getPipeByState() {
    return of(true);
  }

  private setImpsEvenly(value: number, modelIdx: number) {
    const imps = this.state.polycad.model.template.models[modelIdx].imp_poses;
    if (imps.length) {
      for (let i = 0; i < imps.length; i++) {
        imps[i] = Math.round(value * (i + 1) / (imps.length + 1));
      }
      // this.state.polycad.model.template.models[modelIdx].imp_poses = [...imps];

      if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
        this.process(new SetWindowImpPositions(imps));
      } else {
        this.process(new SetDoorImpPositions(imps));
      }
    }
  }

  // переключение москитки
  rollMoskit(fillId: string, modelIdx = 0) {
    const fill = this.state.polycad.model.template.models[modelIdx].fills.find((_: any) => _.id === fillId);
    if (!fill) {
      return;
    }
    const operator = this.getPipeByState();
    operator.pipe(
      switchMap((result: boolean) => {
        console.log(result);
        const editable_fill_idx = this.state.polycad.model.template
          .models[modelIdx].fills.indexOf(fill);
        this.state.polycad.model.template.models[modelIdx]
          .fills[editable_fill_idx].moskit = !this.state.polycad.model.template
            .models[modelIdx].fills[editable_fill_idx].moskit;

        this.updateModel();
        return of(result);
      })
    ).subscribe();
  }

  rollFill(fillId: any) {
    // console.log('rollFill: any, data = ', fillId);
    let modelIdx = 0;
    let finded = false;
    for (const model of this.state.polycad.model.template.models) {
      if (finded) {
        break;
      }
      let fillIdx = 0;
      let fill: PolycadFill = null;
      for (const currFill of model.fills) {
        if (currFill.id === fillId) {
          finded = true;
          fill = currFill;
          break;
        }
        fillIdx++;
      }
      if (finded) {
        const operator = this.getPipeByState();
        operator.pipe(
          switchMap((result: boolean) => {
            console.log(result);
            this.state.polycad.controller.curModelIdx = modelIdx;
            this.state.polycad.controller.editable_fill_idx = fillIdx + 1;
            const openTypeIdx = this.state.polycad.settings.open_types.indexOf(fill.open_type);
            const nextOpenTypeIdx = (fill.available_open_types.indexOf(openTypeIdx) + 1) % fill.available_open_types.length;
            const openTypeIdxNext = fill.available_open_types[nextOpenTypeIdx];
            const otIdx = this.state.polycad.settings.open_types[openTypeIdxNext] as OpenType;
            if (this.state.polycad.model.template.models[modelIdx].type === 'window') {
              this.setOpenTypeWindow(fillIdx, otIdx);
            } else {
              this.setOpenTypeDoor(fillIdx, otIdx);
            }
            return of(result);
          })
        ).subscribe();
      }
      modelIdx++;
    }
  }

  setEditableImpost(idx: number) {
    // // console.log('selectImpost: any, data = ', idx);
    // if (this.modelProviderService && this.modelProviderService.model) {
    //   this.modelProviderService.model.setEditableImpost(idx);
    // }
  }

  drawPolycadModel() {
    if (!this.state || this.skeepDrawing) {
      return;
    }

    if (this.state.polycad && this.viewGraphics) {
      
      const prevModelIdx = this.state.polycad.controller.curModelIdx;

      this.state.polycad.controller.curModelIdx = prevModelIdx;

      this.viewGraphics.redraw(
        this.state.polycad.settings,
        this.state.polycad.model,
        +this.state.polycad.model.template.id.replace('template-', ''),
        this.drawOptions,
        this.state.polycad.model.template.installOptions
      );

    }
  }

}
interface ICT {
  viewBox: string;
  width: number;
  svg: string;
  name: string;
  idtemplate: string;
}