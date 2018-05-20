import { Component, Input } from '@angular/core';
import { BillItem } from '../bill-item';

@Component({
  selector: 'app-bill-footer',
  templateUrl: './bill-footer.component.html',
  styleUrls: ['./bill-footer.component.css']
})
export class BillFooterComponent {

  @Input()
  billItems: BillItem[];

  constructor() { }

}
