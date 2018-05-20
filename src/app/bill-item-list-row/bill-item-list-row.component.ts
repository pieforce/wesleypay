import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BillItem } from '../bill-item'

@Component({
  selector: 'app-bill-item-list-row',
  templateUrl: './bill-item-list-row.component.html',
  styleUrls: ['./bill-item-list-row.component.css']
})
export class BillItemListRowComponent {

  @Input() billItem: BillItem;

  @Output()
  remove: EventEmitter<BillItem> = new EventEmitter();

  @Output()
  togglePaid: EventEmitter<BillItem> = new EventEmitter();

  constructor() {
  }

  toggleBillItemPaid(billItem: BillItem) {
    this.togglePaid.emit(billItem);
  }

  removeBillItem(billItem: BillItem) {
    this.remove.emit(billItem);
  }

}
