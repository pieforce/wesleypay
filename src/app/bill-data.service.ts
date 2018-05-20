import { Injectable } from '@angular/core';
import { BillItem } from './bill-item';

@Injectable()
export class BillDataService {
  // Placeholder for last ID so we can simulate auto-incrementing of IDs
  lastId: number = 0;

  // Placeholder for bill items
  billItems: BillItem[] = [];

  constructor() { }

  // Simulate POST /bill-items
  addBillItem(billItem: BillItem): BillDataService {
    if (!billItem.id) {
      billItem.id = ++this.lastId;
    }
    this.billItems.push(billItem);
    return this;
  }

  // Simulate DELETE /bill-items/:id
  deleteBillItemById(id: number): BillDataService {
    this.billItems = this.billItems
      .filter(billItem => billItem.id !== id);
    return this;
  }

  // Simulate PUT /bill-items/:id
  updateBillItemById(id: number, values: Object = {}): BillItem {
    let billItem = this.getBillItemById(id);
    if (!billItem) {
      return null;
    }
    Object.assign(billItem, values);
    return billItem;
  }

  // Simulate GET /bill-items
  getAllBillItems(): BillItem[] {
    return this.billItems;
  }

  // Simulate GET /bill-items/:id
  getBillItemById(id: number): BillItem {
    return this.billItems
      .filter(billItem => billItem.id === id)
      .pop();
  }

  // Toggle bill item paid
  toggleBillItemPaid(billItem: BillItem) {
    let updatedBillItem = this.updateBillItemById(billItem.id, {
      paid: !billItem.paid
    });
    return updatedBillItem;
  }
}
