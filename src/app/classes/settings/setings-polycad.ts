// import { PolycadTemplateGenerator, Settings, WindowTemplates } from '@a.chuprin/polycad-core';
import { ProfileSystem, Profile, FurnitureSystem, ColorGroup, Color, Fill } from './classes';

/** Настройки поликада */
export class SettingsPolycad {

    // static settings: Settings = new Settings();
    // static templates = WindowTemplates.templates;

    static profileSystems: ProfileSystem[] = [
        new ProfileSystem('Rehau Euro 60', 'Rehau Euro 60', '', '', '', '', ''),
        new ProfileSystem('Rehau Synego', 'Rehau Synego', '', '', '', '', ''),
    ];
    static profiles: Profile[] = [
        new Profile('frame Rehau Euro 60', 'frame', 1, 50, 'frame', 'Rehau Euro 60'),
        new Profile('impost Rehau Euro 60', 'impost', 1, 50, 'impost', 'Rehau Euro 60'),
        new Profile('leaf Rehau Euro 60', 'leaf', 1, 50, 'leaf', 'Rehau Euro 60'),
        new Profile('connector Rehau Euro 60', 'connector', 1, 50, 'connector', 'Rehau Euro 60'),

        new Profile('frame Rehau Synego', 'frame', 1, 50, 'frame', 'Rehau Synego'),
        new Profile('impost Rehau Synego', 'impost', 1, 50, 'impost', 'Rehau Synego'),
        new Profile('leaf Rehau Synego', 'leaf', 1, 50, 'leaf', 'Rehau Synego'),
        new Profile('connector Rehau Synego', 'connector', 1, 50, 'connector', 'Rehau Synego'),
    ];
    static furnitureSystems: FurnitureSystem[] = [
        new FurnitureSystem('Siegenia', 'Siegenia', '', '', '', '', ''),
    ];
    static colorGroups: ColorGroup[] = [
        new ColorGroup('main', 'main', '', ''),
    ];
    static colors: Color[] = [
        new Color('#fff', 'Белый', 'main', 'Белый', '', ''),
        new Color('#471d00', 'Коричневый', 'main', 'Коричневый', '', ''),
    ];
    static fills: Fill[] = [
        new Fill('4-16-4', '4-16-4', 1, 2, 3, '', '', '', '', ''),
    ];

    static prepare() {
    //     const settings = SettingsPolycad.settings;

    //     if (SettingsPolycad.profileSystems.length) {
    //         settings.profile_systems = [...SettingsPolycad.profileSystems];
    //     }
    //     if (SettingsPolycad.profiles.length) {
    //         settings.profiles = [...SettingsPolycad.profiles];
    //     }
    //     if (SettingsPolycad.furnitureSystems.length) {
    //         settings.furniture_systems = [...SettingsPolycad.furnitureSystems];
    //     }
    //     if (SettingsPolycad.colorGroups.length) {
    //         settings.color_groups = [...SettingsPolycad.colorGroups];
    //     }
    //     if (SettingsPolycad.colors.length) {
    //         settings.colors = [...SettingsPolycad.colors];
    //     }
    //     if (SettingsPolycad.fills.length) {
    //         settings.fills = [...SettingsPolycad.fills];
    //     }

    //     const constructions = PolycadTemplateGenerator.getAllConstructions(settings);
    //     for (let i = 0; i < constructions.length; i++) {
    //         const polycadConstruction = constructions[i];

    //         polycadConstruction.installOptions.outside_id = Math.floor(Math.random() * 10 + 1);
    //         polycadConstruction.installOptions.interior_id = 11 * i + 1 + i;
    //         if (i === 7) {
    //             polycadConstruction.installOptions.interior_id = 400;
    //         }
    //         if (i > 7) {
    //             polycadConstruction.installOptions.interior_id -= 11;
    //         }
    //         if (i === 11) {
    //             polycadConstruction.installOptions.interior_id = 111;
    //         }
    //         if (i === 12) {
    //             polycadConstruction.installOptions.interior_id = 122;
    //         }
    //         if (i === 13) {
    //             polycadConstruction.installOptions.interior_id = 133;
    //         }
    //         if (i === 14 || i === 15) {
    //             polycadConstruction.installOptions.interior_id = 200;
    //             polycadConstruction.installOptions.outside_id = 20;
    //         }
    //         if (i === 16) {
    //             polycadConstruction.installOptions.interior_id = 300;
    //         }

    //         let w = 1000;
    //         let h = 1300;

    //         const templateIdx = +polycadConstruction.id.replace('template-', '');
    //         // Конструкция - Дверь
    //         const isDoor = (templateIdx === 20 || templateIdx === 21);
    //         // Конструкция - балконный блок
    //         const isBB = (templateIdx > 3 && templateIdx < 8);
    //         // Конструкция - балконный блок (окно справа)
    //         const isLBB = (templateIdx === 7 || templateIdx === 6);
    //         // Конструкция - балконный блок (окно слева)
    //         const isRBB = (templateIdx === 4 || templateIdx === 5);

    //         if (!isDoor && !isBB) {
    //             if (templateIdx === 1) { w = 800; h = 1000; }
    //             if (templateIdx === 2) { w = 1000; h = 1000; }
    //             if (templateIdx === 3) { w = 1500; h = 1300; }
    //             polycadConstruction.models[0].width = w;
    //             polycadConstruction.models[0].height = h;
    //         } else {
    //             if (isDoor) {
    //                 w = 900;
    //                 h = 2000;

    //                 polycadConstruction.models[0].width = w;
    //                 polycadConstruction.models[0].height = h;
    //                 polycadConstruction.models[0].door_imp_poses = [600];
    //             }
    //             if (isBB) {
    //                 if (templateIdx === 4) { w = 1500; h = 2000; }
    //                 if (templateIdx === 5) { w = 1800; h = 2000; }
    //                 if (templateIdx === 6) { w = 1500; h = 2000; }
    //                 if (templateIdx === 7) { w = 1800; h = 2000; }

    //                 // Дверь справа
    //                 if (isLBB) {
    //                     if (templateIdx === 6) {
    //                         polycadConstruction.models[0].width = 600;
    //                         polycadConstruction.models[0].height = 1200;
    //                         polycadConstruction.models[1].width = 800;
    //                         polycadConstruction.models[1].height = 2000;
    //                         // polycadConstruction.models[1].imp_poses = [600];
    //                         polycadConstruction.models[1].door_imp_poses = [600];
    //                     }
    //                     if (templateIdx === 7) {
    //                         polycadConstruction.models[0].width = 1000;
    //                         polycadConstruction.models[0].height = 1200;
    //                         polycadConstruction.models[0].imp_poses = [500];
    //                         polycadConstruction.models[1].width = 800;
    //                         polycadConstruction.models[1].height = 2000;
    //                         polycadConstruction.models[1].door_imp_poses = [600];
    //                     }

    //                 }
    //                 // Дверь слева
    //                 if (isRBB) {
    //                     if (templateIdx === 4) {
    //                         polycadConstruction.models[0].width = 800;
    //                         polycadConstruction.models[0].height = 2000;
    //                         polycadConstruction.models[0].door_imp_poses = [600];
    //                         polycadConstruction.models[1].width = 600;
    //                         polycadConstruction.models[1].height = 1200;
    //                     }
    //                     if (templateIdx === 5) {
    //                         polycadConstruction.models[0].width = 800;
    //                         polycadConstruction.models[0].height = 2000;
    //                         polycadConstruction.models[0].door_imp_poses = [600];
    //                         polycadConstruction.models[1].width = 1000;
    //                         polycadConstruction.models[1].height = 1200;
    //                         polycadConstruction.models[1].imp_poses = [500];
    //                     }
    //                 }
    //             }
    //         }
    //         for (let j = 0; j < polycadConstruction.models.length; j++) {
    //             const model = polycadConstruction.models[j];
    //             if (model) {
    //                 const impCount = model.imp_poses.length;
    //                 if (impCount > 0) {
    //                     for (let k = 0; k < impCount; k++) {
    //                         polycadConstruction.editable_impost = k;
    //                         polycadConstruction.models[j].imp_poses[k] = 500;
    //                         const pos = (k + 1) * polycadConstruction.models[j].width / (impCount + 1);
    //                         polycadConstruction.editable_impost = k;
    //                         polycadConstruction.models[j].imp_poses[k] = +pos;
    //                     }
    //                 }
    //             }
    //         }

    //         for (let j = 0; j < polycadConstruction.models.length; j++) {
    //             polycadConstruction.models[j].back_color = settings.colors[0].id;
    //             polycadConstruction.models[j].color_inside_marking = settings.colors[0].marking;
    //             polycadConstruction.models[j].front_color = settings.colors[0].id;
    //             polycadConstruction.models[j].color_outside_marking = settings.colors[0].marking;
    //         }

    //         WindowTemplates.templates[i] = polycadConstruction;
    //         WindowTemplates.templates[i].models
    //             .forEach(m => m.fills
    //                 .forEach(f =>
    //                     f.available_open_types = [0, 1, 2, 4, 3, 5]));
    //     }


    //     WindowTemplates.templates[0].marking = 'Окно';
    //     WindowTemplates.templates[1].marking = 'Окно с импостом';
    //     WindowTemplates.templates[2].marking = 'Окно с импостами';

    //     this.templates = WindowTemplates.templates;
    }
}
