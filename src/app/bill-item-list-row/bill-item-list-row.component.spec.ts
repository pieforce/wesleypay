import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillItemListRowComponent } from './bill-item-list-row.component';
import { BillItem } from '../bill-item';

describe('BillItemListRowComponent', () => {
  let component: BillItemListRowComponent;
  let fixture: ComponentFixture<BillItemListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemListRowComponent);
    component = fixture.componentInstance;
    component.billItem = new BillItem({ id: 1, title: 'Test', cost: 34.50, complete: false });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
