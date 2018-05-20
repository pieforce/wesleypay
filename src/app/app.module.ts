import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BillDataService } from './bill-data.service';
import { BillHeaderComponent } from './bill-header/bill-header.component';
import { BillItemListComponent } from './bill-item-list/bill-item-list.component';
import { BillItemListRowComponent } from './bill-item-list-row/bill-item-list-row.component';
import { BillFooterComponent } from './bill-footer/bill-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BillHeaderComponent,
    BillItemListComponent,
    BillItemListRowComponent,
    BillFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BillDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
