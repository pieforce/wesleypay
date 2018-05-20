import { BillItem } from './bill-item';

describe('BillItem', () => {
  it('should create an instance', () => {
    expect(new BillItem()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let item = new BillItem({
      title: 'hello',
      cost: 34.50,
      paid: true
    });
    expect(item.title).toEqual('hello');
    expect(item.paid).toEqual(true);
  });
});
