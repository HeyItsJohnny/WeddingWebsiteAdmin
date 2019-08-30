import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";

export interface Rsvp {
  id?: string;
  Name: string;
  SpecialTitle: string;
  SearchName: string;
  SearchSpecialTitle: string;
  Email: string;
  PhoneNo: string;
  Address1: string;
  Address2: string;
  AddressCity: string;
  AddressState: string;
  AddressPostCode: string;
  NumberOfGuests: number;
  CoupleNotes: string;
  ThankYouLetterSent: boolean
  isGoing: Boolean;
  UpdatedAt: number;
  CreatedAt: number;
}

@Injectable({
  providedIn: 'root'
})

export class RsvpService {

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { }
  
  getRsvps() {

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Rsvps').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
  
  getRsvp(id) {
    let rsvpsCollection = this.db.collection('Rsvps');
    return rsvpsCollection.doc<Rsvp>(id).valueChanges();
  }
  
  updateRsvp(rsvp: Rsvp, id: string) {
    var tmp = rsvp;
    tmp.SearchName = rsvp.Name.toLowerCase();
    tmp.SearchSpecialTitle = rsvp.SpecialTitle.toLowerCase();
    let rsvpsCollection = this.db.collection('Rsvps');
    return rsvpsCollection.doc(id).update(tmp);
  }
  
  addRsvp(rsvp: Rsvp) {
    var tmp = rsvp;
    tmp.SearchName = rsvp.Name.toLowerCase();
    tmp.SearchSpecialTitle = rsvp.SpecialTitle.toLowerCase();
    let rsvpsCollection = this.db.collection('Rsvps');
    return rsvpsCollection.add(tmp);
  }

  getRsvpFromSearch(NameToSearch: string) {
    return this.db.collection<Rsvp>('Rsvps', ref => ref.where('Name', '==', NameToSearch).limit(1)).snapshotChanges();
  }

  updateRsvpAttendance(id: string, isGoingBool: boolean){
    let rsvpsCollection = this.db.collection('Rsvps');
    rsvpsCollection.doc(id).update({"isGoing": isGoingBool});
  }

  updateRsvpInformation(id: string, rsvpEmail: string, rsvpPhoneNo: string){
    let rsvpsCollection = this.db.collection('Rsvps');
    rsvpsCollection.doc(id).update({"Email": rsvpEmail});
    rsvpsCollection.doc(id).update({"PhoneNo": rsvpPhoneNo});
  }

  updateRsvpCoupleNote(id: string, CoupleNotes: String){
    let rsvpsCollection = this.db.collection('Rsvps');
    rsvpsCollection.doc(id).update({"CoupleNotes": CoupleNotes});
  }
  
  removeRsvp(id) {
    let rsvpsCollection = this.db.collection('Rsvps');
    return rsvpsCollection.doc(id).delete();
  }

  searchRSVPName(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Rsvps', ref => ref.where('SearchName', '>=', searchValue)
      .where('SearchName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  searchRSVPSpecialTitle(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Rsvps', ref => ref.where('SearchSpecialTitle', '>=', searchValue)
      .where('SearchSpecialTitle', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }
}
