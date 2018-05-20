import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillItem } from '../bill-item';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.css']
})
export class BillItemListComponent {

  @Input()
  billItems: BillItem[];

  @Output()
  remove: EventEmitter<BillItem> = new EventEmitter();

  @Output()
  togglePaid: EventEmitter<BillItem> = new EventEmitter();

  constructor() { }

  onToggleBillItemPaid(billItem: BillItem) {
    this.togglePaid.emit(billItem);
  }

  onRemoveBillItem(billItem: BillItem) {
    this.remove.emit(billItem);
  }

}
