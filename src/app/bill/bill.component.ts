import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import {
  trigger,
  animate,
  transition,
  style,
  query
} from '@angular/animations';

interface Bill {
  description: string;
  items: BillItem[];
  id?: any;
}

interface BillItem {
  title: string;
  subtitles: string[];
  cost: number;
  paid: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit {
  DEFAULT_PAYPAL_BASE_URL: string = 'https://www.paypal.me/WesleyNg/';

  user: Observable<firebase.User>;

  // Firestore Collections
  billColl: AngularFirestoreCollection<Bill>;
  billItemColl: AngularFirestoreCollection<BillItem>;

  // Firestore Documents
  billItemDoc: AngularFirestoreDocument<BillItem>;

  // Observables
  bills: Observable<Bill[]>;
  billItems: Observable<BillItem[]>;

  // Variables
  paypalBaseUrl: string = this.DEFAULT_PAYPAL_BASE_URL;
  billId: string;
  billDescrip: string = '';
  billMessage: string = '';
  total: number = 0;
  subTotal: number = 0;
  tax: number = 0;
  tip: number = 0;
  taxRate: number = 0;
  tipRate: number = 0;
  paypalLink: string = this.paypalBaseUrl;
  totalStr: string = '0.00';
  showDetailedBreakdown: boolean = false;

  // Inject the activatated route
  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    // Subscribe to the parameters observable
    this.route.paramMap.subscribe(params => {
      // Get Bill ID from route param
      console.log('Bill ID: ' + params.get('billId'));
      this.billId = params.get('billId');

      // Store all bills in DB, save in bills
      this.billColl = this.db.collection<Bill>('bills');
      this.bills = this.billColl.valueChanges();

      // Get bill document by Bill ID
      this.billItemDoc = this.db.collection('bills').doc(this.billId);
      
      // Get bill items from collection
      this.billItems = this.billItemDoc.collection<BillItem>('items').valueChanges();

      // Get bill description, message, tax percent, and tip percent
      this.billItemDoc.ref.get().then(doc => {
        if (doc.exists) {
          this.billDescrip = doc.get('description');
          this.billMessage = doc.get('message');

          // Get tax/tip and convert to float
          this.taxRate = doc.get('tax_percent');
          this.taxRate = this.taxRate >= 1 ? this.taxRate/100 : this.taxRate;
          this.tipRate = doc.get('tip_percent');
          this.tipRate = this.tipRate >= 1 ? this.tipRate/100 : this.tipRate;

          // Get PayPal base url
          if (doc.get('paypal_base_url') !== undefined && doc.get('paypal_base_url') != this.DEFAULT_PAYPAL_BASE_URL) {
            this.paypalBaseUrl = doc.get('paypal_base_url');
          } else {
            this.paypalBaseUrl = this.DEFAULT_PAYPAL_BASE_URL;
          }
        } else {
          console.log("Document DNE!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    });

    // Calculate initial values
    this.calcTotal();
  }

  calcTotal() {
    this.subTotal = 0;
    this.total = 0;

    // Sum all checked items
    var selectedBillItems = document.querySelectorAll('input[type=checkbox]:checked');
    for (var i = 0; i < selectedBillItems.length; i++) {
      this.subTotal += parseFloat(selectedBillItems[i].getAttribute("value"));
    }

    // Calculate values
    this.tax = this.subTotal * this.taxRate;
    this.tip = this.subTotal * this.tipRate;
    this.total = this.subTotal + this.tax + this.tip;

    // Update Paypal link with friendly value for total
    this.totalStr = this.total.toFixed(2).toString().replace(',', '');
    this.paypalLink = this.paypalBaseUrl.concat(this.totalStr);
  }

  pay() {
    window.location.href = this.paypalBaseUrl;
  }
}
