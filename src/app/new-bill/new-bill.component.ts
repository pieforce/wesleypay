import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {
  BASE_APP_URL: string = 'https://pay.wng.app/bills/';
  newBillForm: FormGroup;

  user: Observable<firebase.User>;

  paypalBaseUrl: string = 'https://www.paypal.me/WesleyNg/';
  url: string = '';
  docId: string = 'TEST-BILL-CREATION';

  // Inject the activatated route
  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, private db: AngularFirestore, private fb: FormBuilder) {
    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    var randomDocId = 'Bill' +  + (Math.floor(Math.random() * 99999) + 10000) + '-' + formatDate(new Date(), 'MMddyyyy', 'en-US');
    this.newBillForm = this.fb.group({
      docId: new FormControl(randomDocId),
      description: new FormControl(''),
      message: new FormControl(''),
      taxPct: new FormControl('8.75'),
      tipPct: new FormControl('15.00'),
      paypalBaseUrl: new FormControl(this.paypalBaseUrl),
      items: this.fb.array([])
    });
  }

  onSubmit() {
    this.docId = this.newBillForm.get('docId').value;
    this.createNewBill(
      this.docId, 
      this.newBillForm.get('description').value, 
      this.newBillForm.get('message').value, 
      this.newBillForm.get('taxPct').value, 
      this.newBillForm.get('tipPct').value,
      this.newBillForm.get('paypalBaseUrl').value
    );

    if (this.newBillForm.get('items').value.length > 0) {
      this.newBillForm.get('items').value.forEach(item => {
        if (this.docId.length > 0 && item.title.length > 0) {
          this.addNewBillItem(
            this.docId, 
            item.title, 
            item.subtitles, 
            item.cost, 
            item.mandatory, 
            item.paid
          );
        }
      });
    }

    this.url = this.BASE_APP_URL + this.newBillForm.get('docId').value;
  }

  get items() {
    return this.newBillForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      title: new FormControl(''),
      subtitles: new FormControl(''),
      cost: new FormControl(''),
      mandatory: new FormControl('false'),
      paid: new FormControl('false')
    }));
  }

  createNewBill(docId, desc: string, msg: string, taxPct, tipPct, paypalBaseUrl: string) {
    // Create new bill document
    this.db.collection('bills').doc(docId).set({
      description: desc,
      message: msg,
      tax_percent: Number(taxPct),
      tip_percent: Number(tipPct),
      paypal_base_url: paypalBaseUrl,
      date_created: new Date()
    })
    .then(function() {
      console.log(docId + ' document successfully written!');
    })
    .catch(function(error) {
      console.error('Error writing ' + docId + ' document: ', error);
    });
  }

  addNewBillItem(docId, title, subtitles: string, cost, mandatory, paid) {
    var subtitlesArray = [];
    if (subtitles.indexOf(';') >= 0) {
      subtitlesArray = subtitles.split(';');
    }
    
    this.db.collection('bills').doc(docId).collection('items').doc(title).set({
      title: title,
      subtitles: subtitlesArray,
      cost: Number(cost),
      mandatory: (mandatory === 'true'),
      paid: (paid === 'true')
    })
    .then(function() {
      console.log(title + 'item successfully added to ' + docId);
    })
    .catch(function(error) {
      console.error('Error writing ' + title + ' to ' + docId + ': ', error);
    });
  }
}
