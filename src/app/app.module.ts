import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConstrtypeComponent } from './constrtype-component/constrtype.component';
import { ColorsComponent } from './colors-component/colors.component';
import { OptionsComponent } from './options-component/options.component';
import { SystemsComponent } from './systems-component/systems.component';
import { ParamsComponent } from './params-component/params.component';
import { BasketComponent } from './basket-component/basket.component';
import { ResultComponent } from './result-component/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from '@angular/material';
import { NotFoundComponent } from './not-found-component/not-found.component';
import { RouterModule } from '@angular/router';
import { CommonCardComponent } from './common-card/common-card.component';
import { CommonComponent } from './common/common.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes = RouterModule.forRoot([
  // {path: 'constrtype', component: ConstrtypeComponent},
  // {path: 'colors', component: ColorsComponent},
  // {path: 'options', component: OptionsComponent},
  // {path: 'systems', component: SystemsComponent},
  // {path: 'params', component: ParamsComponent},
  // {path: 'result', component: ResultComponent},
  // {path: 'basket', component: BasketComponent},
  // {path: '', redirectTo: '/constrtype', pathMatch: 'full'},
  // {path: '**', component: NotFoundComponent}
]);

@NgModule({
  declarations: [
    AppComponent,
    ConstrtypeComponent,
    ColorsComponent,
    OptionsComponent,
    SystemsComponent,
    ParamsComponent,
    BasketComponent,
    ResultComponent,
    NotFoundComponent,
    CommonCardComponent,
    CommonComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
