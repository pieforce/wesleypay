import { TestBed, inject } from '@angular/core/testing';
import { BillItem } from './bill-item';
import { BillDataService } from './bill-data.service';

describe('BillDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillDataService]
    });
  });

  it('should ...', inject([BillDataService], (service: BillDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllBillItems()', () => {

    it('should return an empty array by default', inject([BillDataService], (service: BillDataService) => {
      expect(service.getAllBillItems()).toEqual([]);
    }));

    it('should return all todos', inject([BillDataService], (service: BillDataService) => {
      let todo1 = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      let todo2 = new BillItem({title: 'Hello 2', cost: 34.50, paid: true});
      service.addBillItem(todo1);
      service.addBillItem(todo2);
      expect(service.getAllBillItems()).toEqual([todo1, todo2]);
    }));

  });

  describe('#save(todo)', () => {

    it('should automatically assign an incrementing id', inject([BillDataService], (service: BillDataService) => {
      let todo1 = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      let todo2 = new BillItem({title: 'Hello 2', cost: 34.50, paid: true});
      service.addBillItem(todo1);
      service.addBillItem(todo2);
      expect(service.getBillItemById(1)).toEqual(todo1);
      expect(service.getBillItemById(2)).toEqual(todo2);
    }));

  });

  describe('#deleteBillItemById(id)', () => {

    it('should remove todo with the corresponding id', inject([BillDataService], (service: BillDataService) => {
      let todo1 = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      let todo2 = new BillItem({title: 'Hello 2', cost: 34.50, paid: true});
      service.addBillItem(todo1);
      service.addBillItem(todo2);
      expect(service.getAllBillItems()).toEqual([todo1, todo2]);
      service.deleteBillItemById(1);
      expect(service.getAllBillItems()).toEqual([todo2]);
      service.deleteBillItemById(2);
      expect(service.getAllBillItems()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([BillDataService], (service: BillDataService) => {
      let todo1 = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      let todo2 = new BillItem({title: 'Hello 2', cost: 34.50, paid: true});
      service.addBillItem(todo1);
      service.addBillItem(todo2);
      expect(service.getAllBillItems()).toEqual([todo1, todo2]);
      service.deleteBillItemById(3);
      expect(service.getAllBillItems()).toEqual([todo1, todo2]);
    }));

  });

  describe('#updateBillItemById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([BillDataService], (service: BillDataService) => {
      let todo = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      service.addBillItem(todo);
      let updatedBillItem = service.updateBillItemById(1, {
        title: 'new title',
        cost: 9000.00
      });
      expect(updatedBillItem.title).toEqual('new title');
      expect(updatedBillItem.cost).toEqual(9000.00);
    }));

    it('should return null if todo is not found', inject([BillDataService], (service: BillDataService) => {
      let todo = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      service.addBillItem(todo);
      let updatedBillItem = service.updateBillItemById(2, {
        title: 'new title'
      });
      expect(updatedBillItem).toEqual(null);
    }));

  });

  describe('#toggleBillItemComplete(todo)', () => {

    it('should return the updated todo with inverse paid status', inject([BillDataService], (service: BillDataService) => {
      let todo = new BillItem({title: 'Hello 1', cost: 34.50, paid: false});
      service.addBillItem(todo);
      let updatedBillItem = service.toggleBillItemPaid(todo);
      expect(updatedBillItem.paid).toEqual(true);
      service.toggleBillItemPaid(todo);
      expect(updatedBillItem.paid).toEqual(false);
    }));

  });

});