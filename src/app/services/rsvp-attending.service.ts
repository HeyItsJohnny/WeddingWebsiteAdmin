import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { AngularFireAuth } from "angularfire2/auth";

export interface RsvpAttendingDetails {
  id?: string;
  rsvpID: string;
  rsvpGuestID: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpAttendingService {

  private rsvpAttendingCollection: AngularFirestoreCollection<RsvpAttendingDetails>;
  private rsvpAttending: Observable<RsvpAttendingDetails[]>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) { 
      this.rsvpAttendingCollection = db.collection('RSVPAttending');
 
      this.rsvpAttending = this.rsvpAttendingCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
  
    getRsvpAttending(rsvpName: string) {
      return this.rsvpAttendingCollection.doc<RsvpAttendingDetails>(rsvpName).valueChanges();
    }
   
    updateRsvpAttending(rsvpAttend: RsvpAttendingDetails, rsvpName: string) {
      return this.rsvpAttendingCollection.doc(rsvpName).update(rsvpAttend);
    }
   
    addRsvpAttending(rsvpAttend: RsvpAttendingDetails, rsvpName: string) {
      return this.rsvpAttendingCollection.doc(rsvpName).set(rsvpAttend);
    }
  
    removeRsvpAttending(id) {
      return this.rsvpAttendingCollection.doc(id).delete();
    }
}
