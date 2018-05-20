import { Component } from '@angular/core';
import { BillDataService } from './bill-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BillDataService]
})
export class AppComponent {

  constructor (private billDataService: BillDataService) {
  }

  onAddBillItem(billItem) {
    this.billDataService.addBillItem(billItem);
  }

  onToggleBillItemPaid(billItem) {
    this.billDataService.toggleBillItemPaid(billItem);
  }

  onRemoveBillItem(billItem) {
    this.billDataService.deleteBillItemById(billItem.id);
  }

  get billItems() {
    return this.billDataService.getAllBillItems();
  }

}
