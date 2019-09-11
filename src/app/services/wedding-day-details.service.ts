import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { AngularFireAuth } from "angularfire2/auth";

export interface WeddingDayDetails {
  id?: string;
  WeddingPartyGroupdID: string;
  WeddingDate: Date;
  EstimatedNoOfGuests: number;
  YourName: string;
  BudgetEstimate: number;
  FianceName: string;
  ReceptionTime: Time;
  DinnerTime: Time;
  CocktailTime: Time;
  VenueName: string;
  VenueAddress1: string;
  VenueAddress2: string;
  VenueCity: string;
  VenueState: string;
  VenueZip: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeddingDayDetailsService {
  private weddingDaysCollection: AngularFirestoreCollection<WeddingDayDetails>;
  private weddingDays: Observable<WeddingDayDetails[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
    
    this.weddingDaysCollection = db.collection('WeddingDayDetails');
 
    this.weddingDays = this.weddingDaysCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getWeddingDay() {
    return this.weddingDaysCollection.doc<WeddingDayDetails>('Details').valueChanges();
  }
 
  updateWeddingday(weddingParty: WeddingDayDetails) {
    return this.weddingDaysCollection.doc('Details').update(weddingParty);
  }
 
  addWeddingDay(weddingParty: WeddingDayDetails) {
    return this.weddingDaysCollection.doc('Details').set(weddingParty);
  }

  removeWeddingDay(id) {
    return this.weddingDaysCollection.doc(id).delete();
  }
}
