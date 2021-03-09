import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonCardComponent } from './common-card/common-card.component';
import { NotFoundComponent } from './not-found-component/not-found.component';
const routes: Routes = [
  { path: ':token', component: CommonCardComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
