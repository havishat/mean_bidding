import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BidsComponent} from './bids/bids.component';
import {LoginComponent} from './login/login.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'bids',
    pathMatch: 'full',
    component: BidsComponent,
  },
  {
    path: 'result',
    pathMatch: 'full',
    component: ResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
