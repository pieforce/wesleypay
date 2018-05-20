import { Component, Output, EventEmitter } from '@angular/core';
import { BillItem } from '../bill-item'

@Component({
  selector: 'app-bill-header',
  templateUrl: './bill-header.component.html',
  styleUrls: ['./bill-header.component.css']
})
export class BillHeaderComponent {

  newBillItem: BillItem = new BillItem();

  @Output()
  add: EventEmitter<BillItem> = new EventEmitter();

  constructor() { }

  addBillItem() {
    this.add.emit(this.newBillItem);
    this.newBillItem = new BillItem();
  }

}
