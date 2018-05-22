import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";
import { AppRoutingModule } from '../app-routing.module';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../../environments/firebase.config';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { BillComponent } from './bill.component';
import { HomeComponent } from '../home/home.component';
import { routes } from "../app-routing.module";

import {APP_BASE_HREF} from '@angular/common';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(FirebaseConfig.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule 
      ],
      declarations: [ 
        BillComponent,
        HomeComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "test" takes you to /bills/ThisIsATestBill', fakeAsync(() => {
    router.navigate(['/test']);
    tick(50);
    expect(location.path()).toBe('/bills/ThisIsATestBill');
  }));
});
