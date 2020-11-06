// import { Polycad, PolycadConstruction, PolycadFill, PolycadTemplateGenerator, Settings, SimpleXMLExporter, ViewModel, WindowTemplates } from '@a.chuprin/polycad-core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreAction } from './actions/store-action';
import { SettingsPolycad } from './classes/settings/setings-polycad';
import { State } from './classes/state';
import { SimpleJSONModel } from './interfaces/simple-json';

@Injectable({
  providedIn: 'root'
})
export class StateProviderService {

  state: BehaviorSubject<State> = new BehaviorSubject(null);
  lastState: State = new State();
  constructor() { }

  next(state: State) {
    // state.polycad = null;
    this.lastState = JSON.parse(JSON.stringify(state));
    state = this.createPolycad(state);
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
    // const templateDefault = SettingsPolycad.templates.find(_ => _.id.replace('template-', '') === stateUpdated.simpleJSON.idtemplate);
    // if (templateDefault) {
    //   const template = this.fillTemplateFromSimpleJSON(templateDefault, stateUpdated.simpleJSON);
    //   template.isModelChanged = true;
    //   const pageStub = { document: null, window: null };
    //   const polycad: Polycad = new Polycad(pageStub, '', false);
    //   polycad.settings = SettingsPolycad.settings;
    //   polycad.exporter = new SimpleXMLExporter(polycad.settings);
    //   template.installOptions.interior_id = 1;
    //   polycad.model = new ViewModel(template, polycad.settings);
    //   polycad.model.setModel(template);
    //   polycad.model.width = stateUpdated.simpleJSON.width + stateUpdated.simpleJSON.width_door;
    //   polycad.model.height = +stateUpdated.simpleJSON.height_door > +stateUpdated.simpleJSON.height
    //     ? +stateUpdated.simpleJSON.height_door
    //     : +stateUpdated.simpleJSON.height;

    //   stateUpdated.polycad = polycad;
    // }
    return stateUpdated;
  }

  // fillTemplateFromSimpleJSON(template: PolycadConstruction, simpleJSON: SimpleJSONModel): PolycadConstruction {
  //   const templateUpdated = JSON.parse(JSON.stringify(template)) as PolycadConstruction;
  //   const window = templateUpdated.models.filter(_ => _.type === 'window')[0];
  //   const door = templateUpdated.models.filter(_ => _.type === 'door')[0];

  //   if (window) {
  //     window.width = simpleJSON.width;
  //     window.height = simpleJSON.height;

  //     let c = 0;
  //     simpleJSON.fields.forEach(f => {
  //       window.fills[c].open_type = f.open_type;
  //       window.fills[c].marking = simpleJSON.glass;
  //       c++;
  //     });

  //     window.imp_poses = [...simpleJSON.imposts];
  //   }

  //   if (door) {
  //     door.width = simpleJSON.width_door;
  //     door.height = simpleJSON.height_door;

  //     let c = 0;
  //     simpleJSON.fields_door.forEach(f => {
  //       door.fills[c].open_type = f.open_type;
  //       door.fills[c].marking = simpleJSON.glass;
  //       c++;
  //     });

  //     door.imp_poses = [...simpleJSON.imposts_door];
  //     door.door_imp_poses = [...simpleJSON.imposts_door];
  //   }

  //   templateUpdated.models.forEach(m => m.profile_system = simpleJSON.profile);
  //   templateUpdated.models.forEach(m => m.furniture_system = simpleJSON.furniture);
  //   templateUpdated.models.forEach(m => m.fill_marking = simpleJSON.glass);
  //   templateUpdated.models.forEach(m => m.front_color = simpleJSON.color_out);
  //   templateUpdated.models.forEach(m => m.color_outside_marking = simpleJSON.color_out);
  //   templateUpdated.models.forEach(m => m.back_color = simpleJSON.color_in);
  //   templateUpdated.models.forEach(m => m.color_inside_marking = simpleJSON.color_in);

  //   return templateUpdated;
  // }
}
