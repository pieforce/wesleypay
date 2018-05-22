import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillComponent } from './bill/bill.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bills',
    component: HomeComponent
  },
  {
    path: 'bills/:billId',
    component: BillComponent
  },
  {
    path: 'test',
    redirectTo: 'bills/ThisIsATestBill'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
