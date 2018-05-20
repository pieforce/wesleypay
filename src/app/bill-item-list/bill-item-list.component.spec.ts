import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BillItemListComponent } from './bill-item-list.component';
import { BillItem } from '../bill-item';

describe('BillItemListComponent', () => {
  let component: BillItemListComponent;
  let fixture: ComponentFixture<BillItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillItemListComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillItemListComponent);
    component = fixture.componentInstance;
    component.billItems = [
     new BillItem({ id: 1, title: 'Test', cost: 34.50, paid: false })
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
