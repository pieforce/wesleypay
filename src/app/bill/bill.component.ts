import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

interface Bill {
  description: string;
  items: BillItem[];
  id?: any;
}

interface BillItem {
  title: string;
  cost: number;
  paid: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  user: Observable<firebase.User>;

  billColl: AngularFirestoreCollection<Bill>;
  billItemColl: AngularFirestoreCollection<BillItem>;
  billItemDoc: AngularFirestoreDocument<BillItem>;
  bills: Observable<Bill[]>;
  // bills: Observable<Bill[]>;
  billItems: Observable<BillItem[]>;
  // billItems: any;
  // billItems: any;
  // billItems: Observable<any[]>;
  // billItems: BillItem[] = [];

  billId: string;
  billDescrip: string = '';

  // billId: string = 'J8NgHKUaWaIU0wRyQ0We';

  // inject the activatated route
  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.auth.signInAnonymously();
    this.user = this.afAuth.authState;

    // this.billColl = this.db.collection('bills', ref => ref.where('description', '==', 'Test Bill Curry House'));
    // this.bills = this.billColl.valueChanges();

    // this.billColl = this.db.collection<Bill>('bills');
    // this.bills = this.billColl.valueChanges();
    

    // this.billItemColl = this.db.collection<BillItem>('bills/' + 'FJ8NgHKUaWaIU0wRyQ0We' + '/items');
    // this.billItems = this.billItemColl.valueChanges();
  }

  ngOnInit() {
    // subscribe to the parameters observable
    this.route.paramMap.subscribe(params => {
      console.log('Bill ID: ' + params.get('billId'));
      this.billId = params.get('billId');

      // this.billItems = this.billItemColl.valueChanges();
      // this.bills = this.db.collection('bills').valueChanges();
      // this.bills = this.db.doc('bills/' + params.get('billId')).valueChanges();
      // this.bills = this.db.doc('bills/' + params.get('billId')).valueChanges();
      // this.billItems = this.db.doc('bills/' + params.get('billId')).valueChanges();

      // this.billColl = this.db.collection('bills', ref => ref.where('description', '==', 'Test Bill Curry House'));
      this.billColl = this.db.collection<Bill>('bills');
      this.bills = this.billColl.valueChanges();

      this.billItemDoc = this.db.collection('bills').doc(this.billId);
      this.billItemDoc.ref.get().then(doc => {
        if (doc.exists) {
          this.billDescrip = doc.get('description');
          console.log('Bill Description: ' + this.billDescrip);
        } else {
          console.log("Document DNE!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      this.billItems = this.billItemDoc.collection<BillItem>('items').valueChanges();


      // this.billColl.doc(params.get('billId')).ref.get().then(function(doc) {
      //   if (doc.exists) {
      //       console.log("Document data:", doc.data());
      //       console.log("Document items:", doc.get('items'));
      //       console.log("Document json:", doc.get('items')[0].title);
      //       this.billItems = doc.get('items') as BillItem;
      //       console.log("billItems:", this.billItems);
      //   } else {
      //       console.log("No such document! " + params.get('billId'));
      //   }
      // }).catch(function(error) {
      //     console.log("Error getting document:", error);
      // });



      // this.billColl.doc(params.get('billId')).ref.get().then(function(doc) {
      //   if (doc.exists) {
      //       console.log("Document data:", doc.data());
      //       console.log("Document items:", doc.get('items'));
      //       console.log("Document costs:", doc.get('items/cost'));
      //       this.billItems = doc.get('items');
      //   } else {
      //       console.log("No such document! " + params.get('billId'));
      //   }
      // }).catch(function(error) {
      //     console.log("Error getting document:", error);
      // });
    });
    
    
  }

  // public getBillItems() {
  //   console.log(this.billItems);
  //   // this.billItems = this.db.doc('bills/' + this.billId);
  //   this.db
  // }
}
