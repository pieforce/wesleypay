import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillFooterComponent } from './bill-footer.component';
import { BillItem } from '../bill-item';

describe('BillFooterComponent', () => {
  let component: BillFooterComponent;
  let fixture: ComponentFixture<BillFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFooterComponent);
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
